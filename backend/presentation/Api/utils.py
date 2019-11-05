from itertools import chain
from presentation.models import Level


def updatePosition(child, target, position):
	if position == 0:
		child.move_to(target, "first-child")
		child.parent = target
		child.save()
		cached_list = list(chain(target.get_children().order_by('position')))
		cached_list.insert(0,child)

	else:
		parent = target.parent
		children_list = parent.get_children().order_by('position')
		cached_list = list(chain(children_list))
		# cached_list = sorted(cached_list, key=lambda instance: instance.position)
		try:
			#move under same parent
			cached_list.remove(child)

		except:
			#child not found, change parent
			if position == -1:
				child.move_to(target, "left")

			elif position == 1:
				child.move_to(target,'right' )
			pass

		if position == -1:
			cached_list.insert(cached_list.index(target), child)
		elif position == 1:
			cached_list.insert(cached_list.index(target) + 1, child)

	print(cached_list)
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

	Level.objects.rebuild()
	return
