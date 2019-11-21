import React from "react";
import './index.css'

export const NextButton = props => (
	<svg
		width={116}
		height={42}
		xmlnsXlink="http://www.w3.org/1999/xlink"
		{...props}
	>
		<g className = "pageButton" fill="#EAE8DC" fillRule="evenodd">
			<path stroke="#000" d="M.5.5h115v41H.5z"/>
			<text
				fontFamily="TimesNewRomanPSMT, Times New Roman"
				fontSize={20}
				letterSpacing={0.807}
				fill="#000"
			>
				<tspan x={6} y={27}>
					{`Next`}
				</tspan>
			</text>
			<g>
				<path d="M68 21.5h19" stroke="#455A64" strokeWidth={6}/>
				<path
					d="M98.284 22.58c.932-.596.935-1.561 0-2.16l-9.915-6.34C86.51 12.89 85 13.71 85 15.917v11.167c0 2.204 1.504 3.029 3.37 1.836l9.914-6.34z"
					fill="#455A64"
				/>
			</g>
		</g>
	</svg>
);


