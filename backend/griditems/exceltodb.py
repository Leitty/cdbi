import xlrd
from .models import Griditems,dict_map


def excel_table_by_name(filename):
    xdata = xlrd.open_workbook(filename)
    table = xdata.sheet_by_index(0)
    nrows = table.nrows
    row_dict = {}
    for row_num in range(1, nrows):
        row = table.row_values(row_num)
        row_dict[row[0]] = row[1]
    return row_dict


def import_griditems_batch(filename):
    data = excel_table_by_name(filename)
    list = []
    for k, v in data.items():
        new_items = Griditems(item_ch=k, item_eng=v)
        list.append(new_items)
    Griditems.objects.bulk_create(list)


def import_dict_map_batch(filename):
    data = excel_table_by_name(filename)
    list = []
    for k, v in data.items():
        new_items = dict_map(dict_ch=k, dict_eng=v)
        list.append(new_items)
    dict_map.objects.bulk_create(list)
