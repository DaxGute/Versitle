from turtle import update


def getLinesOfFile(file):
    f = open(file, "r")
    listOfLines = []
    for line in f:
        line = line.strip()
        if (len(line) == 5):
            listOfLines.append(line.strip())

    f.close()
    return listOfLines

def main():
    updatedList = getLinesOfFile("./five-letter-words.txt")
    updatedList = sorted(updatedList)
    f = open("./five-letter-words.txt", "w")
    for word in updatedList:
        f.write(word+"\n")
    f.close()

main()