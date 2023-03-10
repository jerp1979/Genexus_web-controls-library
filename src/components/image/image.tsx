import { Component, Element, Host, Listen, Prop, h } from "@stencil/core";
import {
  DisableableComponent,
  Component as GxComponent,
  VisibilityComponent
} from "../common/interfaces";
import {
  HighlightableComponent,
  makeHighlightable
} from "../common/highlightable";

import { cssVariablesWatcher } from "../common/css-variables-watcher";
import lazySizes from "lazysizes";

// Class transforms
import { getClasses } from "../common/css-transforms/css-transforms";

const LAZY_LOAD_CLASS = "gx-lazyload";
const LAZY_LOADING_CLASS = "gx-lazyloading";
const LAZY_LOADED_CLASS = "gx-lazyloaded";

const lazyLoadedImages = new Set<string>();

@Component({
  shadow: false,
  styleUrl: "image.scss",
  tag: "gx-image"
})
export class Image
  implements
    GxComponent,
    DisableableComponent,
    VisibilityComponent,
    HighlightableComponent {
  constructor() {
    cssVariablesWatcher(
      this,
      [
        {
          cssVariableName: "--image-scale-type",
          propertyName: "scaleType",
          defaultPropertyValue: "contain"
        }
      ],
      0
    );

    this.handleClick = this.handleClick.bind(this);
    this.handleImageLoad = this.handleImageLoad.bind(this);

    this.handleLazyLoaded = this.handleLazyLoaded.bind(this);
    document.addEventListener("lazyloaded", this.handleLazyLoaded);
  }

  @Element() element: HTMLGxImageElement;

  /**
   * This attribute lets you specify the alternative text.
   */
  @Prop() readonly alt: string = "";

  /**
   * If true, the component will be sized to match the image's intrinsic size when not constrained
   * via CSS dimension properties (for example, height or width).
   * If false, the component will never force its height to match the image's intrinsic size. The width, however,
   * will match the intrinsic width. In GeneXus terms, it will auto grow horizontally, but not vertically.
   */
  @Prop() readonly autoGrow = true;

  /**
   * A CSS class to set as the `gx-image` element class.
   */
  @Prop() readonly cssClass: string;

  /**
   * This attribute lets you specify if the element is disabled.
   * If disabled, it will not fire any user interaction related event
   * (for example, click event).
   */
  @Prop() readonly disabled = false;

  /**
   * This attribute lets you specify how this element will behave when hidden.
   *
   * | Value        | Details                                                                     |
   * | ------------ | --------------------------------------------------------------------------- |
   * | `keep-space` | The element remains in the document flow, and it does occupy space.         |
   * | `collapse`   | The element is removed form the document flow, and it doesn't occupy space. |
   */
  @Prop() readonly invisibleMode: "collapse" | "keep-space" = "collapse";

  /**
   * True to lazy load the image, when it enters the viewport.
   */
  @Prop() readonly lazyLoad = true;

  /**
   * This attribute allows specifing how the image is sized according to its container.
   * `contain`, `cover`, `fill` and `none` map directly to the values of the CSS `object-fit` property.
   * The `tile` value repeats the image, both vertically and horizontally, creating a tile effect.
   */
  @Prop({ mutable: true }) scaleType:
    | "contain"
    | "cover"
    | "fill"
    | "none"
    | "tile";

  /**
   * True to show the image picker button.
   */
  @Prop() showImagePickerButton = false;

  /**
   * This attribute lets you specify the `src` of the `img`.
   */
  @Prop() readonly src: string = "";

  /**
   * This attribute lets you specify the `srcset` of the `img`. The `srcset`
   * attribute defines the set of images we will allow the browser to choose
   * between, and what size each image is. Each set of image information is
   * separated from the previous one by a comma.
   */
  @Prop() readonly srcset: string = "";

  /**
   * True to highlight control when an action is fired.
   */
  @Prop() readonly highlightable = false;

  @Listen("click", { capture: true })
  handleClick(event: UIEvent) {
    if (this.disabled) {
      event.stopPropagation();
      return;
    }
  }

  /**
   * `true` if the image has been loaded
   */
  private imageDidLoad = false;

  private innerImageContainer: HTMLDivElement = null;

  private handleImageLoad(event: UIEvent) {
    const img = event.target as HTMLImageElement;
    // if (!this.autoGrow) {
    //   // Some image formats do not specify intrinsic dimensions. The naturalWidth property returns 0 in those cases.
    //   if (img.naturalWidth !== 0) {
    //   }
    // }
    img.style.setProperty("display", "block");
    img.style.removeProperty("opacity");
    this.imageDidLoad = true;
  }

  componentDidLoad() {
    makeHighlightable(this, this.innerImageContainer);
  }

  disconnectedCallback() {
    document.removeEventListener("lazyloaded", this.handleLazyLoaded);
    this.innerImageContainer = null;
  }

  render() {
    const shouldLazyLoad = this.shouldLazyLoad();

    // Styling for gx-image control.
    const classes = getClasses(this.cssClass);

    const withoutAutogrow = this.scaleType !== "tile" && !this.autoGrow;

    const shouldRenderTheImg = this.srcset || this.src;

    const body = shouldRenderTheImg
      ? [
          <img
            class={{
              "inner-image": true,
              [LAZY_LOAD_CLASS]: shouldLazyLoad,
              "gx-image-tile": this.scaleType === "tile"
            }}
            style={{
              backgroundImage:
                this.scaleType === "tile" ? `url(${this.src})` : null,
              opacity: !this.imageDidLoad ? "0" : null
            }}
            onClick={this.handleClick}
            onLoad={this.handleImageLoad}
            // With lazy loading
            data-src={shouldLazyLoad && this.src ? this.src : undefined}
            data-srcset={
              shouldLazyLoad && this.srcset ? this.srcset : undefined
            }
            // Without lazy loading
            src={!shouldLazyLoad && this.src ? this.src : undefined}
            srcset={!shouldLazyLoad && this.srcset ? this.srcset : undefined}
            alt={this.alt}
          />,
          <span class="gx-image-loading-indicator" />
        ]
      : [];

    return (
      <Host
        class={{
          [classes.vars]: true,
          disabled: this.disabled,
          "gx-img-lazyloading": shouldLazyLoad,
          "gx-img-no-auto-grow": withoutAutogrow
        }}
      >
        <div
          class={{
            "gx-image-container": true,
            [this.cssClass]: !!this.cssClass
          }}
          // Mouse pointer to indicate action
          data-has-action={
            this.highlightable && !this.disabled ? "" : undefined
          }
          // Necessary to avoid the focus-within state when clicking the picker-button
          data-no-action={this.showImagePickerButton && !this.highlightable}
          // Add focus to the control through sequential keyboard navigation and visually clicking
          tabindex={this.highlightable && !this.disabled ? "0" : undefined}
          ref={el => (this.innerImageContainer = el as HTMLDivElement)}
        >
          {withoutAutogrow ? (
            <div class="gx-image-no-auto-grow-container">{body}</div>
          ) : (
            body
          )}
          {this.showImagePickerButton && <slot />}
        </div>
      </Host>
    );
  }

  private shouldLazyLoad(): boolean {
    // Lazy load is disabled
    if (!this.lazyLoad) {
      return false;
    }

    // Do not lazy load already loaded images
    if (lazyLoadedImages.has(this.srcset) || lazyLoadedImages.has(this.src)) {
      return false;
    }

    const img: HTMLImageElement = this.element.querySelector("img");
    return img === null || img.classList.contains(LAZY_LOAD_CLASS);
  }

  private handleLazyLoaded(event: CustomEvent) {
    const img: HTMLImageElement = this.element.querySelector("img");

    if (event.target === img) {
      this.element.classList.remove("gx-img-lazyloading");

      const imageSrc = this.srcset || this.src;

      // Store the srcset or src of the lazy loaded image
      lazyLoadedImages.add(imageSrc);
    }
  }
}

lazySizes.cfg.lazyClass = LAZY_LOAD_CLASS;
lazySizes.cfg.loadingClass = LAZY_LOADING_CLASS;
lazySizes.cfg.loadedClass = LAZY_LOADED_CLASS;
