package SmallTodoList;

import java.util.ArrayList;
import java.util.List;

public class PrimitiveVsWrapper {
    public static void main(String[] args) {
        // 1. Declaration and Initialization
        int primitiveInt = 42;                // Primitive type
        Integer wrapperInt = Integer.valueOf(42);  // Wrapper class
        Integer autoBoxedInt = 42;            // Autoboxing (Java 5+)

        // 2. Default Values
        int defaultPrimitive;                 // Default: 0
        Integer defaultWrapper;               // Default: null

        // Uncomment to see NullPointerException
        // int unboxNull = defaultWrapper;     // Would throw NPE

        // 3. Memory Allocation
        // Primitives: Stack memory
        // Wrappers: Heap memory (object overhead ~12-16 bytes)
        System.out.println("Primitive size (int): 4 bytes");
        System.out.println("Wrapper size (Integer): " + MemoryUtil.deepMemoryUsageOf(wrapperInt) + " bytes");

        // 4. Usage Differences
        List<Integer> numbers = new ArrayList<>(); // Collections require wrappers
        numbers.add(primitiveInt);             // Autoboxing
        int num = numbers.get(0);              // Unboxing

        // 5. Comparison
        Integer a = 127;
        Integer b = 127;
        System.out.println(a == b);            // true (cached values)

        Integer c = 128;
        Integer d = 128;
        System.out.println(c == d);            // false
        System.out.println(c.equals(d));       // true

        // 6. Null Handling
        Integer possibleNull = null;
        // Uncomment to see NullPointerException
        // int dangerous = possibleNull;       // Runtime NPE

        // 7. Utility Methods
        String numberStr = "123";
        int parsed = Integer.parseInt(numberStr);  // Conversion method
        System.out.println(Integer.toBinaryString(42)); // 101010
    }
}

// Helper class for memory measurement (simplified)
class MemoryUtil {
    public static long deepMemoryUsageOf(Object object) {
        // Simplified estimation: header(12) + int value(4) = 16 bytes
        return 16;
    }
}