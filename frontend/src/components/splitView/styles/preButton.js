import React from "react";
import './index.css'

export const PreButton = props => (
	<svg
		width={116}
		height={42}
		xmlnsXlink="http://www.w3.org/1999/xlink"
		{...props}
	>
		<defs>
			<path id="a" d="M0 0h116v42H0z"/>
		</defs>
		<g className = "button" fill="none" fillRule="evenodd">
			<use fill="#EAE8DC" xlinkHref="#a"/>
			<path stroke="#000" d="M.5.5h115v41H.5z"/>
			<text
				fontFamily="ComicSansMS, Comic Sans MS"
				fontSize={20}
				letterSpacing={0.807}
				fill="#000"
			>
				<tspan x={58} y={27}>
					{`Pre`}
				</tspan>
			</text>
			<g>
				<path d="M46 21.5H27" stroke="#455A64" strokeWidth={6}/>
				<path
					d="M15.716 22.58c-.932-.596-.935-1.561 0-2.16l9.915-6.34C27.49 12.89 29 13.71 29 15.917v11.167c0 2.204-1.504 3.029-3.37 1.836l-9.914-6.34z"
					fill="#455A64"
				/>
			</g>
		</g>
	</svg>
);





