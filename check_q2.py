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

    for i in range(2):

        if i == 0:
            cmd_0 = 'mongo disaster --quiet ' + os.getcwd() + '\\' + project_name + '\\' + 'init_q2.js'
            print('INDEX 삭제')
            os.system(cmd_0)
        else:
            cmd_0 = 'mongo disaster --quiet ' + path + 'q4.js'
            print('INDEX 생성')
            os.system(cmd_0)

        cmd_1 = 'mongo disaster --quiet --eval "var r = 0.01;" ' + path + 'q2.js'

        f = os.popen(cmd_1)

        print("CHECK: ", cmd_1)
        error_count = 0
        start = time.time()
        with open('ds2_nosql_hw2\\result_q2_1.txt') as result:
            result_txt = f.readline().lstrip().rstrip()
            correct_txt = result.readline().lstrip().rstrip()
            if result_txt != correct_txt:
                print("ERROR: ", result_txt, correct_txt)
                error_count += 1
        elapse_time1.append(time.time() - start)
        if error_count == 0:
            print("OK")

        cmd_2 = 'mongo disaster --quiet --eval "var r = 0.5;" ' + path + 'q2.js'

        print("CHECK: ", cmd_2)
        f = os.popen(cmd_2)
        error_count = 0
        start = time.time()
        with open('ds2_nosql_hw2\\result_q2_2.txt') as result:
            result_txt = f.readline().lstrip().rstrip()
            correct_txt = result.readline().lstrip().rstrip()
            if result_txt != correct_txt:
                print("ERROR: ", result_txt, correct_txt)
                error_count += 1
        
        elapse_time2.append(time.time() - start)
        if error_count == 0:
            print("OK")
        
        print('--------------------------------------')
    
time1 = []
for i in range(0, len(names) * 2, 2):
    time1.append(str(elapse_time1[i]) + '--> ' + str(elapse_time1[i+1]))

time2 = []
for i in range(0, len(names) * 2, 2):
    time2.append(str(elapse_time2[i]) + '--> ' + str(elapse_time2[i+1]))

table = [names, time1, time2]
print(tabulate(table, headers='firstrow', tablefmt='psql', numalign='left'))