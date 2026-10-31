export default {
  cooldown: (pkg) => {
    if (
      ["@mr-hope/", "@oxfmt/", "@oxlint/", "@oxlint-tsgolint/"].some((prefix) =>
        pkg.startsWith(prefix),
      ) ||
      ["oxc-config-hope", "oxfmt", "oxlint", "oxlint-tsgolint", "tsdown"].includes(pkg)
    )
      return 0;

    return 1;
  },
  workspaces: true,
  peer: true,
  upgrade: true,
  timeout: 360000,
  target: (name) => {
    if (name === "@types/node") return "minor";
    // `typescript` majors are breaking for the typescript-eslint based preset, keep it on the
    // current minor line until the whole toolchain is ready for the next major.
    if (name === "typescript") return "minor";

    return "latest";
  },
};
