from itertools import chain
from presentation.models import Level


def updatePosition(child, target, position):
	parent = target.parent

	children_list = parent.get_children().order_by('position')
	children_para_list = parent.para_set.all().order_by('position')

	# merge two list
	cached_list = list(chain(children_list, children_para_list))
	cached_list = sorted(cached_list, key=lambda instance: instance.position)

	try:
		cached_list.remove(child)
	except:
		if position == -1:
			pos = 'left'
		else:
			pos = 'right'
		child.move_to(target,pos)
		Level.objects.rebuild()
		pass

	if position == -1:
		position = 0
	cached_list.insert(cached_list.index(target)+position,child)

	index = 0
	for i in cached_list:
		if i.position != index:
			i.position = index
			try:
				i.save()
			except:
				Level.objects.rebuild()
				i.save()

		index += 1

	return
