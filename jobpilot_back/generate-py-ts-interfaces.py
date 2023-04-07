import os

TEMP_FILE_PATH = "./temp.ts"
OUTPUT_FILE_PATH = "../jobpilot_front/types/dbModels.ts"


def main():
    # Generate interfaces on temp.ts
    os.system("py-ts-interfaces ./models/*.py -c -o " + TEMP_FILE_PATH)

    # Read temp.ts
    with open(TEMP_FILE_PATH, "r") as temp_file:
        # Read all lines
        lines = temp_file.readlines()

    # Read lines one by one
    for i in range(len(lines)):
        # Replace "interface" with "export interface"
        lines[i] = lines[i].replace("interface", "export interface")

    # Write lines to dbModels.ts
    with open(OUTPUT_FILE_PATH, "w") as output_file:
        output_file.writelines(lines)

    # Delete temp.ts
    os.remove(TEMP_FILE_PATH)


if __name__ == "__main__":
    main()
