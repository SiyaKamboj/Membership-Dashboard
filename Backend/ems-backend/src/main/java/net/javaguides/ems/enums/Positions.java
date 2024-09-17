package net.javaguides.ems.enums;

public enum Positions {
    PHASE_1_INTERN("Phase 1 Intern"),
    PHASE_2_INTERN("Phase 2 Intern"),
    JR_PRODUCER("Jr Producer"),
    PRODUCER("Producer"),
    SENIOR_PRODUCER("Senior Producer"),
    EXECUTIVE_PRODUCER("Executive Producer"),
    ASSOCIATE("Associate"),
    ALUMNI("Alumni"),
    ADMIN_STATION_MANAGER("Admin - Station Manager"),
    ADMIN_DIRECTOR_INTERNAL_AFFAIRS("Admin - Director of Internal Affairs"),
    ADMIN_STAFF_DEVELOPMENT_COORDINATOR("Admin - Staff Development Coordinator"),
    ADMIN_DIRECTOR_EXTERNAL_AFFAIRS("Admin - Director of External Affairs"),
    ADMIN_SENIOR_PROJECT_MANAGER("Admin - A.S. Senior Project Manager"),
    ADMIN_PROJECT_MANAGER("Admin - Project Manager"),
    ADMIN_FILM_FESTIVAL_COORDINATOR("Admin - Film Festival Coordinator"),
    OTHER("Other");

    // Getter to retrieve the display name
    private final String displayName;

    // Constructor to associate display names
    Positions(String displayName) {
        this.displayName = displayName;
    }
    // Getter to retrieve the display name
    public String getDisplayName() {
        return displayName;
    }

    // Static method to convert display name back to enum constant
    //used before saving it into mysql
    public static Positions fromDisplayName(String displayName) {
        for (Positions position : Positions.values()) {
            if (position.getDisplayName().equalsIgnoreCase(displayName)) {
                System.out.println("returning "+ position);
                return position;
            }
        }
        throw new IllegalArgumentException("No enum constant for display name: " + displayName);
    }

    /*@Override
    public String toString() {
        return displayName;
    }*/
}


