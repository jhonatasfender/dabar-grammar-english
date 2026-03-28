"use strict";

if (!("canParse" in URL)) {
  URL.canParse = function (input, base) {
    try {
      return !!new URL(input, base);
    } catch {
      return false;
    }
  };
}
