// Mock para los hooks utilizados en ThemedBanner
jest.mock("../../hooks", () => ({
  useThemeColor: jest.fn().mockImplementation(() => "#4CAF50"),
}));

jest.mock("@/presentation/shared/hooks", () => ({
  useResponsiveDimensions: jest.fn().mockReturnValue({
    isSmallScreen: false,
    getResponsiveValue: jest.fn((options) => options.medium),
  }),
}));


describe("Probar <ThemedBanner/>", () => {
 
});
