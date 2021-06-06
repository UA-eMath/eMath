/*************************************************************
 *  Copyright (c) 2019 MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

MathJax.Extension["mathtools"] = {
  version: "1.2.0",
};

MathJax.Hub.Register.StartupHook("TeX Jax Ready", function () {
  var TEX = MathJax.InputJax.TeX;
  TEX.Definitions.Add({
    macros: {
      coloneqq: ["Macro", "\\mathrel{≔}"],
      xleftrightarrow: ["xArrow", 0x2194, 7, 6],
    },
    environment: {
      dcases: ["Array", null, "\\{", ".", "ll", null, ".2em", "D"],
      rcases: ["Array", null, ".", "\\}", "ll", null, ".2em", "D"],

      "matrix*": ["ExtensionEnv", null, "AMSmath"],
      "pmatrix*": ["ExtensionEnv", null, "AMSmath"],
      "bmatrix*": ["ExtensionEnv", null, "AMSmath"],
      "Bmatrix*": ["ExtensionEnv", null, "AMSmath"],
      "vmatrix*": ["ExtensionEnv", null, "AMSmath"],
      "Vmatrix*": ["ExtensionEnv", null, "AMSmath"],

      "smallmatrix*": ["ExtensionEnv", null, "AMSmath"],
      psmallmatrix: ["ExtensionEnv", null, "AMSmath"],
      "psmallmatrix*": ["ExtensionEnv", null, "AMSmath"],
      bsmallmatrix: ["ExtensionEnv", null, "AMSmath"],
      "bsmallmatrix*": ["ExtensionEnv", null, "AMSmath"],
      Bsmallmatrix: ["ExtensionEnv", null, "AMSmath"],
      "Bsmallmatrix*": ["ExtensionEnv", null, "AMSmath"],
      vsmallmatrix: ["ExtensionEnv", null, "AMSmath"],
      "vsmallmatrix*": ["ExtensionEnv", null, "AMSmath"],
      Vsmallmatrix: ["ExtensionEnv", null, "AMSmath"],
      "Vsmallmatrix*": ["ExtensionEnv", null, "AMSmath"],

      multlined: ["ExtensionEnv", null, "AMSmath"],
    },
  });
});

MathJax.Hub.Register.StartupHook("TeX AMSmath Ready", function () {
  var MML = MathJax.ElementJax.mml,
    TEX = MathJax.InputJax.TeX,
    STACKITEM = TEX.Stack.Item;

  TEX.Definitions.Add({
    environment: {
      "matrix*": ["MtMatrix", null, null, null],
      "pmatrix*": ["MtMatrix", null, "(", ")"],
      "bmatrix*": ["MtMatrix", null, "[", "]"],
      "Bmatrix*": ["MtMatrix", null, "\\{", "\\}"],
      "vmatrix*": ["MtMatrix", null, "\\vert", "\\vert"],
      "Vmatrix*": ["MtMatrix", null, "\\Vert", "\\Vert"],

      "smallmatrix*": ["MtSmallMatrix", null, null, null],
      psmallmatrix: ["MtSmallMatrix", null, "(", ")", "c"],
      "psmallmatrix*": ["MtSmallMatrix", null, "(", ")"],
      bsmallmatrix: ["MtSmallMatrix", null, "[", "]", "c"],
      "bsmallmatrix*": ["MtSmallMatrix", null, "[", "]"],
      Bsmallmatrix: ["MtSmallMatrix", null, "\\{", "\\}", "c"],
      "Bsmallmatrix*": ["MtSmallMatrix", null, "\\{", "\\}"],
      vsmallmatrix: ["MtSmallMatrix", null, "\\vert", "\\vert", "c"],
      "vsmallmatrix*": ["MtSmallMatrix", null, "\\vert", "\\vert"],
      Vsmallmatrix: ["MtSmallMatrix", null, "\\Vert", "\\Vert", "c"],
      "Vsmallmatrix*": ["MtSmallMatrix", null, "\\Vert", "\\Vert"],

      multlined: "MtMultlined",
    },
  });

  TEX.Parse.Augment({
    MtMatrix: function (begin, open, close) {
      var align = this.GetBrackets("\\begin{" + begin.name + "}") || "c";
      return this.Array(begin, open, close, align);
    },

    MtSmallMatrix: function (begin, open, close, align) {
      if (!align)
        align = this.GetBrackets("\\begin{" + begin.name + "}") || "c";
      return this.Array(
        begin,
        open,
        close,
        align,
        this.Em(1 / 3),
        ".2em",
        "S",
        1
      );
    },

    MtMultlined: function (begin) {
      var pos = this.GetBrackets("\\begin{" + begin.name + "}") || "";
      var width = pos ? this.GetBrackets("\\begin{" + begin.name + "}") : null;
      if (!pos.match(/^[cbt]$/)) {
        var tmp = width;
        width = pos;
        pos = tmp;
      }
      this.Push(begin);
      return this.setArrayAlign(
        STACKITEM.multlined(false, this.stack).With({
          arraydef: {
            displaystyle: true,
            rowspacing: ".5em",
            width: width,
            columnwidth: "100%",
          },
        }),
        pos || "c"
      );
    },

    HandleShove: function (name, shove) {
      var top = this.stack.Top();
      if (top.type !== "multline" && top.type !== "multlined") {
        TEX.Error([
          "CommandInMultlined",
          "%1 can only appear within the multline or multlined environments",
          name,
        ]);
      }
      if (top.data.length) {
        TEX.Error([
          "CommandAtTheBeginingOfLine",
          "%1 must come at the beginning of the line",
          name,
        ]);
      }
      top.data.shove = shove;
      var shift = this.GetBrackets(name);
      var mml = this.ParseArg(name);
      if (shift) {
        var mrow = MML.mrow();
        var mspace = MML.mspace().With({ width: shift });
        if (shove === "left") {
          mrow.Append(mspace);
          mrow.Append(mml);
        } else {
          mrow.Append(mml);
          mrow.Append(mspace);
        }
        mml = mrow;
      }
      this.Push(mml);
    },
  });

  STACKITEM.multlined = STACKITEM.multline.Subclass({
    EndTable: function () {
      if (this.data.length || this.row.length) {
        this.EndEntry();
        this.EndRow();
      }
      if (this.table.length) {
        var m = this.table.length - 1;
        if (this.table[0][0].columnalign !== "right") {
          this.table[0][0].Append(
            MML.mspace().With({ width: TEX.config.MultlineGap || "2em" })
          );
        }
        if (this.table[m][0].columnalign !== "left") {
          this.table[m][0].data[0].data.unshift(null);
          this.table[m][0].data[0].SetData(
            0,
            MML.mspace().With({ width: TEX.config.MultlineGap || "2em" })
          );
        }
      }
      this.SUPER(arguments).EndTable.call(this);
    },
  });
});

MathJax.Callback.Queue(["loadComplete", MathJax.Ajax, "[Extra]/mathtools.js"]);
