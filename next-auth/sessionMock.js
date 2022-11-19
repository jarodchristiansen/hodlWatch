export const sessionMock = jest.mock("next-auth/client", () => {
  const originalModule = jest.requireActual("next-auth/client");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: "admin" },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return [mockSession, "authenticated"]; // return type is [] in v3 but changed to {} in v4
    }),
  };
});
