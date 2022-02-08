from itertools import chain
from presentation.models import Level, Para
from presentation.Serializers.user_serializer import UserSerializer


def updatePosByOrder(cached_list):
    index = 0
    for i in cached_list:
        if i.position != -1:
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


def updateParaPosition(parent):
    children_list = parent.get_children().order_by('position')
    children_para_list = parent.para_set.all().order_by('position')
    cached_list = mergeAndSort(
        children_list,
        children_para_list)  # list(chain(children_list, children_para_list))

    # to avoid "memory loss", delete para's parent if it has no children
    if len(cached_list) == 0:
        parent.delete()

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


def moveUpOrDown(parent, position, action):
    # parent: current para's parent
    # position: current para's position
    # action: up (-1), down (1)
    children_list = parent.get_children().order_by('position')
    children_para_list = parent.para_set.all().order_by('position')
    cached_list = mergeAndSort(
        children_list,
        children_para_list)  #list(chain(children_list, children_para_list))

    # to avoid "memory loss", delete para's parent if it has no children
    if len(cached_list) == 0:
        parent.delete()

    if action == -1 and position == 0:  # if be the first part, you can't move up
        return
    elif action == 1 and position == len(
            cached_list) - 1:  # if be the last part, you can't move down
        return
    else:
        # current one
        cached_list[position].position = position + action
        cached_list[position].save()
        # previous one
        cached_list[position + action].position = position
        cached_list[position + action].save()


def updatePositionGivenTarget(child, target, position):
    if position == 0:
        child.move_to(target, "first-child")
        child.parent = target
        child.save()
        cached_list = list(chain(target.get_children().order_by('position')))
        cached_list.insert(0, child)

    else:
        parent = target.parent
        children_list = parent.get_children().order_by('position')
        cached_list = list(chain(children_list))
        try:
            # move under same parent
            cached_list.remove(child)

        except:
            # child not found, change parent
            if position == -1:
                child.move_to(target, "left")

            elif position == 1:
                child.move_to(target, 'right')
            pass

        if position == -1:
            cached_list.insert(cached_list.index(target), child)
        elif position == 1:
            cached_list.insert(cached_list.index(target) + 1, child)

    updatePosByOrder(cached_list)
    return


def updatePosition(parent):
    children_list = parent.get_children().order_by('position')
    children_para_list = parent.para_set.all().order_by('position')
    cached_list = mergeAndSort(children_list, children_para_list)
    updatePosByOrder(cached_list)
    return


def getParas(root):
    paras = []
    while root and (root.get_children() or root.para_set.all()):
        # insert Level object inside para list
        mergedList = mergeAndSort(root.get_children(), root.para_set.all())
        # recursive insertion
        for obj in mergedList:
            if obj.__class__.__name__ == 'Para':
                paras.append(obj)
            else:
                blockParas = getParas(obj)
                if blockParas != []:
                    paras.append(blockParas)

        return paras

    return paras


def mergeAndSort(block, paras):
    res = list(chain(block, paras))
    res.sort(key=lambda x: x.position)
    return res


def myJwtResponseHandler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={
            'request': request
        }).data
    }