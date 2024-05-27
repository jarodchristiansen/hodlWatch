import {
  BorderRadius,
  BorderWidth,
  FontFamily,
  FontSize,
  FontWeight,
  MediaQueries,
  Opacity,
  Padding,
} from "./variables";

describe("Styles", () => {
  it("should have the correct padding values", () => {
    expect(Padding.small).toEqual("4px");
    expect(Padding.medium).toEqual("8px");
    expect(Padding.large).toEqual("16px");
    expect(Padding.xlarge).toEqual("32px");
    expect(Padding.xxlarge).toEqual("48px");
  });

  it("should have the correct font size values", () => {
    expect(FontSize.small).toEqual("12px");
    expect(FontSize.medium).toEqual("16px");
    expect(FontSize.large).toEqual("24px");
    expect(FontSize.xlarge).toEqual("32px");
    expect(FontSize.xxlarge).toEqual("64px");
  });

  it("should have the correct font family values", () => {
    expect(FontFamily.primary).toEqual("Arial");
    expect(FontFamily.secondary).toEqual("Helvetica");
    expect(FontFamily.tertiary).toEqual("Times New Roman");
  });

  it("should have the correct font weight values", () => {
    expect(FontWeight.light).toEqual("300");
    expect(FontWeight.regular).toEqual("400");
    expect(FontWeight.bold).toEqual("700");
  });

  it("should have the correct border radius values", () => {
    expect(BorderRadius.small).toEqual("4px");
    expect(BorderRadius.medium).toEqual("8px");
    expect(BorderRadius.large).toEqual("16px");
    expect(BorderRadius.xlarge).toEqual("32px");
    expect(BorderRadius.xxlarge).toEqual("64px");
  });

  it("should have the correct border width values", () => {
    expect(BorderWidth.small).toEqual("1px");
    expect(BorderWidth.medium).toEqual("2px");
    expect(BorderWidth.large).toEqual("4px");
    expect(BorderWidth.xlarge).toEqual("8px");
    expect(BorderWidth.xxlarge).toEqual("16px");
  });

  it("should have the correct opacity values", () => {
    expect(Opacity.small).toEqual("0.25");
    expect(Opacity.medium).toEqual("0.5");
    expect(Opacity.large).toEqual("0.75");
    expect(Opacity.xlarge).toEqual("0.9");
    expect(Opacity.xxlarge).toEqual("1");
  });

  it("should have the correct media query values", () => {
    expect(MediaQueries.SM).toEqual("(min-width: 360px)");
    expect(MediaQueries.MD).toEqual("(min-width: 768px)");
    expect(MediaQueries.LG).toEqual("(min-width: 992px)");
    expect(MediaQueries.XL).toEqual("(min-width: 1200px)");
  });
});
