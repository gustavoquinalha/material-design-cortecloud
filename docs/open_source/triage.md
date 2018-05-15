# Triage Process

Start with [untriaged issues](https://github.com/material-components/material-components-web/issues?utf8=%E2%9C%93&q=is%3Aissue%20is%3Aopen%20-label%3Ain-tracker%20-label%3A%22help%20wanted%22%20no%3Aassignee%20sort%3Acreated-asc%20)

### Installation Problems

Some installation problems we can help with. For example, @material SASS paths
in the SASS compiler is expertise we have, and we can help them with this
question. But it is best if the answer to this question is a link to
documentation.

But most installation problems, especially around web frameworks, we cannot
help with. Tell the reporter we do not have the expertise to help them with
this question. We suggest they ask it on stackoverflow.com for better results.
Then close!

### Feature Requests

First, check if this request is in [spec](https://material.io/guidelines) or
not. If you're not sure, tag it as "needs-design-guidance". Tell them we need
time to discuss if this feature request should be in spec.

If it is not in spec, tell them we do not accept feature requests for
components that are not in spec. Inform that MDC Web is the last part of a
bigger Material Design journey.

They are welcome to build this feature request on top of our code, in another
repository. Then close!

If it is in spec, mirror the issue into Pivotal, add the "in-tracker" label.
Tell them we've decided this is in spec, and link to the relevant place in spec.

### Valid Bug

Add the "bug" label. Consider marking it "help wanted" if the reporter has a
reasonable grasp on how to solve it. If we know offhand how to solve it, add
the solution to the response, along with any relevant code samples. Always
kindly ask for a PR if the issue is labeled "help wanted".

Otherwise, mirror the issue into Pivotal, add the "in-tracker" label. Thank
them for filing the bug.
