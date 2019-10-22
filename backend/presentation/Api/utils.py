from itertools import chain

def updatePosition(parent, position=None):
	children_list = parent.get_children().order_by('position')
	children_para_list = parent.para_set.all().order_by('position')

	# merge two list
	cached_list = list(chain(children_list, children_para_list))
	cached_list = sorted(cached_list, key=lambda instance: instance.position)

	index = 0
	if position == None:
		for child in cached_list:
			if child.position != index:
				child.position = index
				child.save()
		index += 1
		return

	for child in cached_list:
		if child.position >= position:
			child.position += 1
			child.save()
	return