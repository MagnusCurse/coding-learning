package SmallTodoList;
import java.util.Scanner;

public class TaskManager {
    private static Task[] tasks = new Task[10];
    private static int taskCount = 0;
    private static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        while(true) {
            printMenu();
            String choice = scanner.nextLine();

            // Control flow with if-else
            if(choice.equals("1")) {
                addTask();
            } else if(choice.equals("2")) {
                listTasks();
            } else if(choice.equals("3")) {
                markTaskCompleted();
            } else if(choice.equals("4")) {
                System.out.println("Exiting...");
                break;
            } else {
                System.out.println("Invalid choice!");
            }
        }
    }

    private static void printMenu() {
        System.out.println("\n--- SmallTodoList.Task Manager ---");
        System.out.println("1. Add SmallTodoList.Task");
        System.out.println("2. List Tasks");
        System.out.println("3. Mark SmallTodoList.Task Completed");
        System.out.println("4. Exit");
        System.out.print("Enter your choice: ");
    }

    private static void addTask() {
        if(taskCount >= tasks.length) {
            System.out.println("SmallTodoList.Task list is full!");
            return;
        }

        System.out.print("Enter task description: ");
        String description = scanner.nextLine();
        tasks[taskCount] = new Task(taskCount + 1, description);
        taskCount++;
        System.out.println("SmallTodoList.Task added!");
    }

    private static void listTasks() {
        System.out.println("\n--- All Tasks ---");
        // Enhanced for loop
        for(Task task : tasks) {
            if(task != null) {
                System.out.println(task.getTaskInfo());
            }
        }
    }

    private static void markTaskCompleted() {
        try {
            System.out.print("Enter task ID to mark completed: ");
            int taskId = Integer.parseInt(scanner.nextLine());

            // Array access and method call
            if(taskId > 0 && taskId <= taskCount) {
                tasks[taskId - 1].markCompleted();
                System.out.println("SmallTodoList.Task marked completed!");
            } else {
                System.out.println("Invalid task ID!");
            }
        } catch(NumberFormatException e) {
            // Exception handling
            System.out.println("Please enter a valid number!");
        }
    }
}