/*************************************************************
 *
 *  MathJax/extensions/TeX/annotations.js
 *
 *  Implements annotations for MathJax
 *  
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2013 Yuri Sulyma <yuri@sulyma.ca>.
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

(() => {
MathJax.Extension.annotations = {version: '1.5'};

/* \Annotations command */
MathJax.Hub.Register.StartupHook("TeX Jax Ready", () => {
  var MML = MathJax.ElementJax.mml,
      TEX = MathJax.InputJax.TeX,
      TEXDEF = TEX.Definitions;
  
  // register the \Annotate command
  TEXDEF.Add({
    macros: {
      Annotate: 'Annotate',
      annotate: 'annotate'
    }
  }, null, true);

  TEX.Parse.Augment({
    // expand macros without screwing up the string
    ExpandMacro(name, macro, argcount, def) {
      var args = [];
      if (argcount) {
        args = [];
        if (def) {
          let optional = this.GetBrackets(name);
          args.push(optional || def);
        }

        for (let i = args.length; i < argcount; ++i)
          args.push(this.GetArgument(name));
          
        macro = this.SubstituteArgs(args, macro);
      }

      return [macro, args];
    },

    // provide the \Annotate command
    Annotate(name) {
      var type = this.GetBrackets(name, ''),
          cmd = this.GetArgument(name).match(/^\\(.+)$/)[1],
          annotation = this.GetArgument(name),
          macro = this.csFindMacro(cmd);
      
      var macro = this.csFindMacro(cmd);
      if (!macro) return;
      
      if (!macro.annotations) {
        // redefine the command to include the annotations
        let args = ['\\' + cmd].concat(macro.slice(1));

        this.setDef(cmd, function(name) {
          // get the original definition
          var [str, params] = TEX.Parse('', {}).ExpandMacro.apply(this, args);

          // stick that into a <semantics> element
          var math = TEX.Parse(str, this.stack.env).mml(),
              mml = MML.semantics(math);

          // now, add the annotations...
          for (let type in macro.annotations) {
            // expand
            let annotation = this.SubstituteArgs(params, macro.annotations[type]).replace(/\\#/g, '#');

            mml.Append(MML.annotation(annotation).With({name: type, isToken: true}));
          }

          this.Push(mml);
        });

        macro = this.csFindMacro(cmd);
        macro.annotations = {};
      }

      macro.annotations[type] = annotation;
    },

    // provide the \annotate command
    annotate(name) {
      // parse the args
      var types = this.GetBrackets(name, '').split(','),
          expr = this.GetArgument(name),
          annotations = {};

      for (let type of types)
        annotations[type] = this.GetArgument(name).replace(/\\#/g, '#');
        
      // render the math
      var math = TEX.Parse(expr, this.stack.env).mml(),
          mml = MML.semantics(math);
      
      for (let type in annotations) {
        let annotation = annotations[type];
        mml.append(MML.annotation(annotation).With({name: type, isToken: true}));
      }
      
      this.Push(mml);
    }
  });
});

/* output jaxes */
MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready", () => {
  var MML = MathJax.ElementJax.mml,
      MML_semantics_toHTML = MML.semantics.prototype.toHTML;

  MML.semantics.Augment({
    toHTML(span, HW, D) {
      var span = MML_semantics_toHTML.call(this, span, HW, D);

      // add the annotations
      for (let i = 1; i < this.data.length; ++i) {
        let d = this.data[i];
        if (d !== null && d.type === 'annotation') {
          let attr = 'data-annotation' + (d.name ? `_${d.name}` : '');
          span.setAttribute(attr, d.data[0]);
        }
      }

      return span;
    }
  });
});

MathJax.Hub.Register.StartupHook("SVG Jax Ready", () => {
  var MML = MathJax.ElementJax.mml,
      SVG = MathJax.OutputJax.SVG;
      MML_semantics_toSVG = MML.semantics.prototype.toSVG;
  
  MML.semantics.Augment({
    toSVG() {
      this.class = 'semantics';
      var svg = MML_semantics_toSVG.call(this);
      
      // add the annotations
      for (let i = 1; i < this.data.length; ++i) {
        let d = this.data[i];
        if (d !== null && d.type === 'annotation') {
          let attr = 'data-annotation' + (d.name ? `_${d.name}` : '');
          svg.element.setAttribute(attr, d.data[0]);
        }
      }
        
      // rectangular click region
      SVG.addElement('rect', {
        fill: 'none',
        height: svg.h + svg.d,
        'pointer-events': 'all',
        stroke: 'none',
        width: svg.w,
        y: -svg.d
      });
                                 
      this.SVGsaveData(svg);
      
      // don't taint the object
      this.class = null;
      return svg;
    }
  });
});

MathJax.Ajax.loadComplete("[Extra]/annotation.js");

})();
