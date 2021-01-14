# \newcommand{\cmd}[args]{content}
tex_commands = {
	"basicCommand": [
		{"tex": r"\newcommand{\Sum}[2]{#1\oplus #2}", "note": "#1 + #2"},
		{"tex": r"\newcommand{\SSum}[3]{#1\oplus #2\oplus #3}", "note": "#1 + #2 + #3"},
		{"tex": r"\newcommand{\FamSum}[2]{\bigoplus_{#1} #2}", "note": "sum over #1 of family #2"},
		{"tex": r"\newcommand{\Fld}[1]{\mathbb{#1}}", "note": "Field symbol set in mathbb"}
	]
}
