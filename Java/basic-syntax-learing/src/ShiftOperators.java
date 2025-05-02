public class ShiftOperators {
    public static void main(String[] args) {
        int negativeNum = -12; // Binary: 0000 1100
        int positiveNum = 12; // Binary: 1111 0100
        int shiftAmount = 2;

        System.out.println("Original values:");
        printBinary("Negative number (-12)", negativeNum);
        printBinary("Positive number (12)", positiveNum);

        // Left Shift Operator (<<)
        System.out.println("Left Shift (<<):");
        int leftShiftNeg = negativeNum << shiftAmount;
        printBinary("-12 << 2", leftShiftNeg);
        int leftShiftPos = positiveNum << shiftAmount;
        printBinary("12 << 2", leftShiftPos);
        System.out.println();

        // Right Shift Operator (>>)
        System.out.println("Right Shift (>>):");
        int rightShiftNeg = negativeNum >> shiftAmount;
        printBinary("-12 >> 2", rightShiftNeg);
        int rightShiftPos = positiveNum >> shiftAmount;
        printBinary("12 >> 2", rightShiftPos);
        System.out.println();

        // Unsigned Right Shift Operator (>>>)
        System.out.println("Unsigned Right Shift (>>>):");
        int unsignedRightShiftNeg = negativeNum >>> shiftAmount;
        printBinary("-12 >>> 2", unsignedRightShiftNeg);
        int unsignedRightShiftPos = positiveNum >>> shiftAmount;
        printBinary("12 >>> 2", unsignedRightShiftPos);
    }

    // The specific implementation details of this function aren't very important—
    // what matters is that you know it can print the full 32-bit binary form of a number.
    // 这个函数的具体实现的一些操作不是很重要，你知道它可以打印一个数字的 32 位完整二进制形式就可以
    private static void printBinary(String label, int number) {
        // %-15s: 左对齐的字符串，占 15 个字符位: 前面加了一个 -，就变成了左对齐。也就是说，字符串靠左显示，右边补空格。
        // %4d: 占 4 个字符宽度的十进制整数
        // %32s: 占 32 个字符宽度的字符串（用于显示二进制）%n: 换行
        System.out.printf("%-15s: Decimal: %4d, Binary: %32s%n",
                label,
                number,
                // Integer.toBinaryString(number): 将整数 number 转换成 二进制字符串，例如 5 -> "101"
                // String.format("%32s", ...): 将这个字符串格式化成 32个字符宽度，在前面补上空格: "101" → "                             101"
                // .replace(' ', '0'): 将这些空格替换为 0，得到完整的32位二进制形式："00000000000000000000000000000101"
                String.format("%32s", Integer.toBinaryString(number)).replace(' ', '0'));
    }
}
