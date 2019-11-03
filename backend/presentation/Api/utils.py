from itertools import chain

def updatePosition(parent, position=None):
	print(parent.get_children())

	children_list = parent.get_children().order_by('position')
	children_para_list = parent.para_set.all().order_by('position')

	# merge two list
	cached_list = list(chain(children_list, children_para_list))
	cached_list = sorted(cached_list, key=lambda instance: instance.position)
	print(cached_list)

	index = 0
	for child in cached_list:
		if child.position != index:
			child.position = index
			try:
				child.save()
			except:
				pass
		index += 1
	return

	# for child in cached_list:
	# 	print(child.position)
	# 	if child.position >= position:
	# 		child.position += 1
	# 		child.save()
	# return