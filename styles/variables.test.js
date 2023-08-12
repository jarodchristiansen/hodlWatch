import {
  BorderRadius,
  BorderWidth,
  Colors,
  FontFamily,
  FontSize,
  FontWeight,
  MediaQueries,
  Opacity,
  Padding,
} from "./variables";

describe("Styles", () => {
  it("should have the correct color values", () => {
    expect(Colors.lightGray).toEqual("#f4f4f4");
    expect(Colors.darkGray).toEqual("#a9a9a9");

    expect(Colors.modern.white).toEqual("#FFFFFC");
    expect(Colors.modern.black).toEqual("#000000");
    expect(Colors.modern.secondaryGray).toEqual("#4A4A4A");
    expect(Colors.modern.accentBlue).toEqual("#0088FF");

    expect(Colors.fresh.white).toEqual("#FFFFFC");
    expect(Colors.fresh.secondaryAqua).toEqual("#83D0C9");
    expect(Colors.fresh.black).toEqual("#000000");
    expect(Colors.fresh.accentBlue).toEqual("#1F4F59");

    expect(Colors.elegant.white).toEqual("#FFFFFC");
    expect(Colors.elegant.black).toEqual("#000000");
    expect(Colors.elegant.secondaryGray).toEqual("#B7B7B7");
    expect(Colors.elegant.accentPurple).toEqual("#6B4CFF");
  });

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
