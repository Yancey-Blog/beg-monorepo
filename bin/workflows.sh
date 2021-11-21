# read the workflow template
WORKFLOW_TEMPLATE=$(cat .github/workflow-template.yml)

# iterate each route in routes directory
for SUB_APP in $(ls apps); do
	echo "generating workflow for apps/${SUB_APP}"

	# replace template route placeholder with route name
	WORKFLOW=$(echo "${WORKFLOW_TEMPLATE}" | sed "s/{{SUB_APP}}/${SUB_APP}/g")
	
	# save workflow to .github/workflows/{SUB_APP}
	echo "${WORKFLOW}" > .github/workflows/github-actions-${SUB_APP}.yml
done