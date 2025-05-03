public class PrimitiveType {
    public static void main(String[] args) {
        // Print header
        System.out.printf("%-7s | %-6s | %-5s | %-15s | %-25s | %s%n",
                "Type", "Bits", "Bytes", "Default Value", "Min Value", "Max Value");
        System.out.println("----------------------------------------------------------------------------------------");

        // Demonstrate all primitive types
        printTypeInfo("byte", Byte.SIZE, Byte.BYTES, "0", Byte.MIN_VALUE, Byte.MAX_VALUE);
        printTypeInfo("short", Short.SIZE, Short.BYTES, "0", Short.MIN_VALUE, Short.MAX_VALUE);
        printTypeInfo("int", Integer.SIZE, Integer.BYTES, "0", Integer.MIN_VALUE, Integer.MAX_VALUE);
        printTypeInfo("long", Long.SIZE, Long.BYTES, "0L", Long.MIN_VALUE, Long.MAX_VALUE);
        printTypeInfo("float", Float.SIZE, Float.BYTES, "0.0f", Float.MIN_VALUE, Float.MAX_VALUE);
        printTypeInfo("double", Double.SIZE, Double.BYTES, "0.0d", Double.MIN_VALUE, Double.MAX_VALUE);
        printTypeInfo("char", Character.SIZE, Character.BYTES, "'\\u0000'", (int) Character.MIN_VALUE, (int) Character.MAX_VALUE);
        printTypeInfo("boolean", 1, "1 (JVM dependent)", "false", "-", "-");
    }

    private static void printTypeInfo(String typeName, int bits, int bytes,
                                      String defaultValue, Number min, Number max) {
        System.out.printf("%-7s | %-6d | %-5d | %-15s | %-25s | %s%n",
                typeName,
                bits,
                bytes,
                defaultValue,
                min.toString(),
                max.toString());
    }

    // Overloaded method for boolean special case
    private static void printTypeInfo(String typeName, int bits, String bytes,
                                      String defaultValue, String min, String max) {
        System.out.printf("%-7s | %-6d | %-5s | %-15s | %-25s | %s%n",
                typeName,
                bits,
                bytes,
                defaultValue,
                min,
                max);
    }
}
