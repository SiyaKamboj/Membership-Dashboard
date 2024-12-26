package net.javaguides.ems.enums;

public enum MajorCodes {
    // Astronomy & Astrophysics
    AT25("Astronomy & Astrophysics (B.S.)"),
    AT26("Astronomy & Astrophysics (B.A.)"),

    // Anthropology
    AN27("Anthropology (Concentration in Archaeology)"),
    AN26("Anthropology (Concentration in Biological Anthropology)"),
    AN28("Anthropology (Concentration in Sociocultural Anthropology)"),
    AN30("Anthropology with a Concentration in Climate Change and Human Solutions"),
    AN29("Biological Anthropology"),
    AN31("Environmental Anthropology"),

    // Bioengineering
    BE25("Bioengineering"),
    BE28("Bioengineering (Bioinformatics)"),
    BE29("Bioengineering: BioSystems"),
    BE27("Bioengineering (Biotechnology)"),

    // Biology
    BI34("Biology with Specialization in Bioinformatics"),
    BI30("Ecology, Behavior, and Evolution"),
    BI31("General Biology"),
    BI35("Human Biology"),
    BI32("Microbiology"),
    BI37("Molecular and Cell Biology"),
    BI38("Neurobiology"),
    BI29("Biochemistry and Cell Biology"),
    BI33("Molecular Biology"),
    BI36("Physiology and Neuroscience"),

    // Black Diaspora and African American Studies
    AA25("Black Diaspora and African American Studies"),

    // Chemical Engineering
    CE25("Chemical Engineering"),

    // Chemistry and Biochemistry
    CH38("Biochemistry"),
    CH25("Chemistry"),
    CH34("Environmental Chemistry"),
    CH36("Molecular Synthesis"),
    CH35("Pharmacological Chemistry"),

    // Chinese Studies
    CN25("Chinese Studies"),

    // Cinematic Arts
    CI25("Cinematic Arts"),

    // Classical Studies
    CL25("Classical Studies"),

    // Cognitive Science
    CG25("Cognitive Science"),
    CG32("Cognitive and Behavioral Neuroscience"),
    CG31("Cognitive Science with a Specialization in Clinical Aspects of Cognition"),
    CG33("Cognitive Science with a Specialization in Design and Interaction"),
    CG34("Cognitive Science with a Specialization in Language and Culture"),
    CG35("Cognitive Science with a Specialization in Machine Learning and Neural Computation"),
    CG29("Cognitive Science with a Specialization in Neuroscience"),

    // Communication
    CM26("Communication"),
    CM28("Media Industries and Communication"),

    // Computer Science and Engineering
    CS25("Computer Engineering"),
    CS26("Computer Science (B.S.)"),
    CS27("Computer Science with a Specialization in Bioinformatics"),

    // Critical Gender Studies
    CR25("Critical Gender Studies"),

    // Data Science
    DS25("Data Science"),

    // Economics
    EN30("Business Economics"),
    EN25("Economics (B.A.)"),
    EN31("Economics (B.S.)"),
    EN29("Economics-Public Policy"),
    EN28("Joint Major in Mathematics and Economics"),

    // Education Studies
    ED25("Education Sciences"),

    // Electrical and Computer Engineering
    EC26("Computer Engineering"),
    EC27("Electrical Engineering"),
    EC28("Engineering Physics"),
    EC37("Electrical Engineering & Society (B.A.)"),

    // Environmental Systems
    ES25("Environmental Systems (Earth Sciences)"),
    ES26("Environmental Systems (Ecology, Behavior, and Evolution)"),
    ES27("Environmental Systems (Environmental Chemistry)"),
    ES28("Environmental Systems (Environmental Policy)"),

    // Ethnic Studies
    ET25("Ethnic Studies"),

    // German Studies
    GS25("German Studies"),

    // Global Health
    GH25("Global Health (B.A.)"),
    GH26("Global Health (B.S.)"),

    // Global South Studies
    GL25("Global South Studies"),

    // Public Health
    PB25("Public Health"),
    PB26("Public Health with Concentration in Biostatistics"),
    PB27("Public Health with Concentration in Climate and Environmental Sciences"),
    PB28("Public Health with Concentration in Community Health Sciences"),
    PB29("Public Health with Concentration in Epidemiology"),
    PB30("Public Health with Concentration in Health Policy and Management Sciences"),
    PB31("Public Health with Concentration in Medicine Sciences"),

    // History
    HI25("History"),

    // Human Developmental Sciences
    HS25("Human Developmental Sciences (B.A.)"),
    HS26("Human Developmental Sciences (B.S.)"),
    HS27("Human Developmental Sciences with a Specialization in Equity and Diversity"),
    HS28("Human Developmental Sciences with a Specialization in Healthy Aging"),

    // Individual Studies
    IN27("Eleanor Roosevelt College Individual Studies"),
    IN25("Muir College Special Project Major"),
    IN26("Revelle College Individual Major"),
    IN29("Thurgood Marshall College Individual Studies"),
    IN28("Warren College Individual Studies"),
    IN30("Sixth College Individual Studies"),
    IN32("Seventh College Individual Studies"),

    // International Studies
    IS25("International Studies — Anthropology"),
    IS26("International Studies — Economics"),
    IS27("International Studies — History"),
    IS28("International Studies — Linguistics"),
    IS29("International Studies — Literature"),
    IS30("International Studies — Political Science"),
    IS31("International Studies — Sociology"),
    IS32("International Studies — Economics (Jt BA/MIA)"),
    IS33("International Studies — Political Science (Jt BA/MIA)"),
    IS34("International Studies — International Business"),
    IS35("International Studies — International Business (Jt BA/MIA)"),
    IS36("International Studies — Philosophy"),

    // Italian Studies
    IT25("Italian Studies"),

    // Japanese Studies
    JA25("Japanese Studies"),

    // Jewish Studies
    JS25("Jewish Studies"),

    // Latin American Studies
    LA25("Latin American Studies"),
    LA26("Latin American Studies with a Concentration in Mexico"),
    LA27("Latin American Studies with a Concentration in Migration and Border Studies"),

    // Linguistics
    LN33("Language Studies"),
    LN25("Linguistics"),
    LN32("Linguistics (Specialization in Cognition and Language)"),
    LN29("Linguistics (Specialization in Language and Society)"),
    LN34("Linguistics (Specialization in Speech and Language Sciences"),

    // Visual Arts
    VA29("Interdisciplinary Computing and the Arts"),
    VA26("Visual Arts (Art History/ Criticism)"),
    VA27("Visual Arts (Media)"),
    VA28("Visual Arts (Studio)"),
    VA30("Speculative Design"),

    //if I somehow missed it
    Other("Other");

    private final String displayName;

    MajorCodes(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}

