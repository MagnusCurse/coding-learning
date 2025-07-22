import java.lang.reflect.Field;

public class WrapperCache {
    public static void main(String[] args) {
//        demonstrateBooleanCache();
        demonstrateByteCache();
        demonstrateCharacterCache();
        demonstrateIntegerCache();
    }

    // Boolean Cache (only two instances)
//    private static void demonstrateBooleanCache() {
//        Boolean b1 = true;
//        Boolean b2 = true;
//        Boolean b3 = new Boolean(true);
//
//        System.out.println("\nBoolean Cache:");
//        System.out.println("b1 == b2: " + (b1 == b2));    // true (cached)
//        System.out.println("b1 == b3: " + (b1 == b3));    // false (new instance)
//    }

    // Byte Cache (-128 to 127)
    private static void demonstrateByteCache() {
        Byte byte1 = 127;
        Byte byte2 = 127;
        Byte byte3 = (byte) 128;  // Wraps around to -128

        System.out.println("\nByte Cache:");
        System.out.println("127 == 127: " + (byte1 == byte2));  // true
        System.out.println("128 becomes: " + byte3 + " (cache check): " + (byte3 == Byte.valueOf((byte)-128))); // true
    }

    // Character Cache (\u0000 to \u007F)
    private static void demonstrateCharacterCache() {
        Character c1 = 'A';
        Character c2 = 'A';
        Character c3 = '€';  // Unicode 20AC (outside cache range)

        System.out.println("\nCharacter Cache:");
        System.out.println("'A' == 'A': " + (c1 == c2));          // true
        System.out.println("'€' == '€': " + (Character.valueOf('€') == Character.valueOf('€'))); // false
    }

    // Integer Cache (-128 to 127, configurable)
    private static void demonstrateIntegerCache() {
        Integer i1 = 127;
        Integer i2 = 127;
        Integer i3 = 128;
        Integer i4 = 128;

        System.out.println("\nInteger Cache:");
        System.out.println("127 == 127: " + (i1 == i2));  // true
        System.out.println("128 == 128: " + (i3 == i4));  // false

        // Demonstrate cache configuration (requires JVM arg: -Djava.lang.Integer.IntegerCache.high=200)
        try {
            Class<?> cache = Class.forName("java.lang.Integer$IntegerCache");
            Field highField = cache.getDeclaredField("high");
            highField.setAccessible(true);
            int high = highField.getInt(cache);
            System.out.println("Current Integer cache high: " + high);
        } catch (Exception e) {
            System.out.println("Cannot access Integer cache settings");
        }
    }
}
