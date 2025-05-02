package SmallTodoList;

public class Task {
    // Instance variables
    private final int id;
    private String description;
    private boolean isCompleted;

    // Constructor
    public Task(int id, String description) {
        this.id = id;
        this.description = description;
        this.isCompleted = false;
    }

    // Methods
    public void markCompleted() {
        this.isCompleted = true;
    }

    public String getTaskInfo() {
        String status = isCompleted ? "[X]" : "[ ]";
        return id + ". " + status + " " + description;
    }
}