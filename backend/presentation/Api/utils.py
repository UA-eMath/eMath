from itertools import chain
from presentation.models import Level, Para
import re


def updateParaPosition(parent):
    children_list = parent.get_children().order_by('position')
    children_para_list = parent.para_set.all().order_by('position')
    cached_list = list(chain(children_list, children_para_list))

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


def updatePosition(child, target, position):
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
        # cached_list = sorted(cached_list, key=lambda instance: instance.position)
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


def getParas(root):
    paras = []

    while root.get_children() or root.para_set.all():
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
    res = []
    i = 0
    j = 0
    while i < len(block) and j < len(paras):
        if block[i].position < paras[j].position:
            res.append(block[i])
            i += 1
        else:
            res.append(paras[j])
            j += 1

    for item in block[i:]:
        res.append(item)

    for item in paras[j:]:
        res.append(item)
    return res


def parseTexCommandFromFile(file_content):
    new_command = r"(\\newcommand\{\\.*\})(\[[0-9]?\])+(.*)(\%.*)"
    pattern = re.compile(new_command)
    matched_commands = []
    tex = file_content.splitlines()
    for line in tex:
        matchObj = re.search(pattern, line)
        if matchObj:
            command = matchObj.group(0)
            tex = re.compile(
                r"(\\newcommand\{\\.*\})(\[[0-9]?\])+\{(.*)\}")
            comment = re.compile(r"\%.*")
            matchTex = re.search(tex, command).group(0)
            matchComment = re.search(comment, command).group(0)
            matched_commands.append(
                {"tex": matchTex, "note": matchComment[1:]})
    return matched_commands
