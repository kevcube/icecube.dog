# title

Release engineering is solved. I don't mean that Continuous Integration is easy,
or can be repeated across any organization. And Continuous Deployment (Delivery?)
is a unique problem for every application. But release engineering itself — the
process by which releases are prepared to go out, is an organizational problem
that I have a strong opinion believing it's finally a book we can close.

Opinions are a growing trend in software. We spent much time and effort making things
as generic as technologically possible. Spending countless hours writing complex
software which enables others to write software in any way they like. We decided that
opinions are bad, and we should not force ours on others. This still holds true for
many things. Freedom has its place in software, policies have their place, and
opinions fit somewhere between the two.

I find that an excess of freedom allows teams to move _too_ fast. It allows generation of debt at unsustainable levels. Policies can sometimes constrain teams to move too slowly. Most of us have had experience at BigCorp where a 15 minute task can take weeks to deploy, drowning in committee, gaining consensus. This can be a consequence of either too much policy requiring painful conformance, or too much artificial freedom which must then go through a consensus-gathering committee function of the organization.

I'm going to share my opinion about a release engineering process I was proud to implement in organizations, and where I was proud to see it accelerate releases, ultimately reducing friction on the highest ideal of software today: shipping.

There's a saying that goes "opinions are like [belly buttons]. Everyone has one, and I don't want to see yours. We live in a world formed by people's opinions. A good number of which benefit me and you. But we don't ever have to look at the belly button itself.

## Changelogs

Changelogs are a vital part of software. When implemented properly, along with proper semver, they provide great clarity to library consumers.
