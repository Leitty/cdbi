import jieba
from .models import dict_map,Griditems
from .exceltodb import excel_table_by_name, import_griditems_batch,import_dict_map_batch


def trans_into_db_word(str):
    jieba.load_userdict('user_dict.txt')
    divwords = list(jieba.cut(str))
    db_word = []
    for word in divwords:
        db_word.append(dict_map.objects.values('dict_eng').get(dict_ch=word)['dict_eng'])
    word_out = '_'.join(db_word)
    return word_out


def excel_into_db(filename,type):
    if type == 'jieba':
        try:
            import_griditems_batch(filename)
            return True
        except Exception as e:
            print(e)
            return False
    elif type == 'griditems':
        try:
            import_dict_map_batch(filename)
            return True
        except Exception as e:
            print(e)
            return False
    return False

