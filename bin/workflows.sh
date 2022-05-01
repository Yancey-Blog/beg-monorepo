# read the workflow template
APPS_WORKFLOW_TEMPLATE=$(cat .github/apps-workflow-template.yml)
LIBS_WORKFLOW_TEMPLATE=$(cat .github/libs-workflow-template.yml)

# iterate each route in routes directory
for SUB_APP in $(ls apps); do
	echo "generating workflow for apps/${SUB_APP}"

	# replace template route placeholder with route name
	WORKFLOW=$(echo "${APPS_WORKFLOW_TEMPLATE}" | sed "s/{{SUB_APP}}/${SUB_APP}/g")
	
	# save workflow to .github/workflows/{SUB_APP}
	echo "${WORKFLOW}" > .github/workflows/github-actions-${SUB_APP}.yml
done

# iterate each route in routes directory
for SUB_APP in $(ls libs); do
	echo "generating workflow for libs/${SUB_APP}"

	# replace template route placeholder with route name
	WORKFLOW=$(echo "${LIBS_WORKFLOW_TEMPLATE}" | sed "s/{{SUB_APP}}/${SUB_APP}/g")
	
	# save workflow to .github/workflows/{SUB_APP}
	echo "${WORKFLOW}" > .github/workflows/github-actions-@shared-${SUB_APP}.yml
done