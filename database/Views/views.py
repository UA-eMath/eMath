from django.shortcuts import render

# Create your views here.
["    <ul>\
		<li>\
			Suppose you are traveling at constant speed of 80km/h. After one hour you will have covered a distance of 80km. After 2 hours you will have covered a distance of 160km; after 3 hours a distance of 240km, etc. &ndash; Thus &lsquo;time traveled&rsquo; and &lsquo;distance covered&rsquo; are in a linear relationship:\
			<math.display>\
				<latex>\text{distance traveled in $k$ hours} = k\cdot \text{(distance traveled in $1$ hour)}</latex>\
			</math.display>\
		</li>\

		<li><para>Suppose each day you put a marble into some bag. Then you know that after 1 day you will have 1 marble, after 2 days you will have two marbles; after <latex>3</latex> days you  will have <latex>3</latex> marbles in the bag, etc. &ndash; This is an example of a linear relationship:</para>
			<math.display>
				<latex>\text{no. of marbles after $k$ days} = k\cdot \text{(no. of marbles after $1$ day)}</latex>
			</math.display>
		</li>

		<li>When driving a car, let&rsquo;s make a table which records the distance it takes to brake the vehicle to a full stop from a given speed. &ndash; Such a table reveals a quadratic relationship.
			between speed and brake distance to a full stop.
		</li>
		<li>
			In a cell growth experiment you might encounter a table like the following


			<table align="center" border="1" bordercolor="Maroon" cellpadding="3">
				<row>
					<cell><para><b>Day</b></para></cell>
					<cell><para>1</para></cell>
					<cell><para>2</para></cell>
					<cell><para>3</para></cell>
					<cell><para>4</para></cell>
					<cell><para>5</para></cell>
					<cell><para>6</para></cell>
					<cell><para>7</para></cell>
				</row>
				<row>
					<cell><para><b>Cell Mass</b></para></cell>
					<cell><para>m</para></cell>
					<cell><para>2m</para></cell>
					<cell><para>4m</para></cell>
					<cell><para>8m</para></cell>
					<cell><para>16m</para></cell>
					<cell><para>32m</para></cell>
					<cell><para>64m</para></cell>
				</row>
			</table>


			<para>This corresponds to a substance which doubles itself every day. Thus &lsquo;number of days passed&rsquo; and &lsquo;cell mass&rsquo; are not in a linear relationship but rather in an exponential relationship:</para>
			<para align="center">cell mass on day k = <latex>2^{k-1}\cdot</latex> (cell mass on day 1)</para>
		</li>
	</ul>
	"]