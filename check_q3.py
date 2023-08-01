import os
import time
from tabulate import tabulate

project_name = 'ds2_nosql_hw2'
names = ['박한영님', '조경희님', '조은옥님']

paths = [
    os.getcwd() + '\\' + project_name + '\\' + names[0] + '\\',
    os.getcwd() + '\\' + project_name + '\\' + names[1] + '\\',
    os.getcwd() + '\\' + project_name + '\\' + names[2] + '\\',
    ]

elapse_time1 = []
elapse_time2 = []

for path in paths:
    cmd_1 = 'mongo disaster --quiet --eval "var r = 30; var m = 4.5;" ' + path + 'q3.js'

    f = os.popen(cmd_1)

    print("CHECK: ", cmd_1)
    error_count = 0
    start = time.time()
    with open('ds2_nosql_hw2\\result_q3_1.txt') as result:
        result_txt = f.readline().lstrip().rstrip()
        correct_txt = result.readline().lstrip().rstrip()
        if result_txt != correct_txt:
            print("ERROR: ", result_txt, correct_txt)
            error_count += 1
    elapse_time1.append(time.time() - start)
    if error_count == 0:
        print("OK")

    cmd_2 = 'mongo disaster --quiet --eval "var r = 10; var m = 3.5;" ' + path + 'q3.js'

    print("CHECK: ", cmd_2)
    f = os.popen(cmd_2)
    error_count = 0
    start = time.time()
    with open('ds2_nosql_hw2\\result_q3_2.txt') as result:
        result_txt = f.readline().lstrip().rstrip()
        correct_txt = result.readline().lstrip().rstrip()
        if result_txt != correct_txt:
            print("ERROR: ", result_txt, correct_txt)
            error_count += 1
    
    elapse_time2.append(time.time() - start)
    if error_count == 0:
        print("OK")
    
    print('--------------------------------------')

table = [names, elapse_time1, elapse_time2]
print(tabulate(table, headers='firstrow', tablefmt='psql', numalign='left'))