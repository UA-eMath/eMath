from itertools import chain
from presentation.models import Level

def updatePosition(child):
	parent = child.parent

	children_list = parent.get_children().order_by('position')
	children_para_list = parent.para_set.all().order_by('position')

	# merge two list
	cached_list = list(chain(children_list, children_para_list))
	cached_list = sorted(cached_list, key=lambda instance: instance.position)

	cached_list.remove(child)

	index = 0
	for i in cached_list:
		if index == child.position:
			index += 1

		if i.position != index:
			i.position = index
			try:
				i.save()
			except:
				Level.objects.rebuild()
				i.save()

		index += 1

	return