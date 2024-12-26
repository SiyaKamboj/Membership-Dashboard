-- Define ENUM types
CREATE TYPE project_type_enum AS ENUM (
    'AS',
    'Narrative_Sanctioned',
    'Club_Collaboration',
    'Narrative_NotSanctioned',
    'Other'
);

CREATE TYPE current_position_enum AS ENUM (
    'PHASE_1_INTERN',
    'PHASE_2_INTERN',
    'JR_PRODUCER',
    'PRODUCER',
    'SENIOR_PRODUCER',
    'EXECUTIVE_PRODUCER',
    'ASSOCIATE',
    'ALUMNI',
    'ADMIN_STATION_MANAGER',
    'ADMIN_DIRECTOR_INTERNAL_AFFAIRS',
    'ADMIN_STAFF_DEVELOPMENT_COORDINATOR',
    'ADMIN_DIRECTOR_EXTERNAL_AFFAIRS',
    'ADMIN_AS_PROJECT_MANAGER',
    'ADMIN_PROJECT_MANAGER',
    'ADMIN_FILM_FESTIVAL_COORDINATOR',
    'OTHER'
);

CREATE TYPE major_enum AS ENUM (
    'AT25', 'AT26',
    'AN27', 'AN26', 'AN28', 'AN30', 'AN29', 'AN31',
    'BE25', 'BE28', 'BE29', 'BE27',
    'BI34', 'BI30', 'BI31', 'BI35', 'BI32', 'BI37', 'BI38', 'BI29', 'BI33', 'BI36',
    'AA25',
    'CE25',
    'CH38', 'CH25', 'CH34', 'CH36', 'CH35',
    'CN25',
    'CI25',
    'CL25',
    'CG25', 'CG32', 'CG31', 'CG33', 'CG34', 'CG35', 'CG29',
    'CM26', 'CM28',
    'CS25', 'CS26', 'CS27',
    'CR25',
    'DS25',
    'EN30', 'EN25', 'EN31', 'EN29', 'EN28',
    'ED25',
    'EC26', 'EC27', 'EC28', 'EC37',
    'ES25', 'ES26', 'ES27', 'ES28',
    'ET25',
    'GS25',
    'GH25', 'GH26',
    'GL25',
    'PB25', 'PB26', 'PB27', 'PB28', 'PB29', 'PB30', 'PB31',
    'HI25',
    'HS25', 'HS26', 'HS27', 'HS28',
    'IN27', 'IN25', 'IN26', 'IN29', 'IN28', 'IN30', 'IN32',
    'IS25', 'IS26', 'IS27', 'IS28', 'IS29', 'IS30', 'IS31', 'IS32', 'IS33', 'IS34', 'IS35', 'IS36',
    'IT25',
    'JA25',
    'JS25',
    'LA25', 'LA26', 'LA27',
    'LN33', 'LN25', 'LN32', 'LN29', 'LN34',
    'LT42', 'LT36', 'LT33', 'LT41',
    'MA33', 'MA36', 'MA29', 'MA27', 'MA31', 'MA30', 'MA32', 'MA35',
    'MC25', 'MC37', 'MC36', 'MC35', 'MC27', 'MC34', 'MC33', 'MC32', 'MC31', 'MC30',
    'MU27', 'MU25', 'MU26',
    'NA25',
    'PL25',
    'PY30', 'PY31', 'PY35', 'PY29', 'PY26', 'PY34', 'PY33', 'PY28', 'PY32',
    'PS25', 'PS26', 'PS27', 'PS28', 'PS29', 'PS30', 'PS31', 'PS32', 'PS33', 'PS34',
    'PC25', 'PC26', 'PC28', 'PC29', 'PC30', 'PC31', 'PC32', 'PC33', 'PC34', 'PC35',
    'RE26',
    'RU26',
    'SI29', 'SI30', 'SI31',
    'SO25', 'SO27', 'SO28', 'SO29', 'SO30', 'SO31', 'SO32', 'SO33',
    'SE27', 'SE29', 'SE28', 'SE30', 'SE31',
    'TH27', 'TH26',
    'UN27', 'UNHA', 'UNPS', 'UNSS',
    'US26', 'US27',
    'VA29', 'VA26', 'VA27', 'VA28', 'VA30', 'Other'
);


CREATE TYPE role_enum AS ENUM (
    'Writer',
    'Director',
    'Assistant_Director',
    'Producer',
    'Executive_Producer',
    'Director_of_Photography',
    'Assistant_Camera',
    'Camera_Operator',
    'Sound_Designer',
    'Boom_Operator',
    'Head_Gaffer',
    'Assistant_Gaffer',
    'Production_Assistant',
    'Head_Editor',
    'Assistant_Editor',
    'Colorist',
    'Other'
);

-- Create tables
CREATE TABLE employees (
    id BIGSERIAL PRIMARY KEY,
    email_id VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    current_position current_position_enum NOT NULL,
    Major major_enum NOT NULL
);

CREATE TABLE projects (
    id BIGSERIAL PRIMARY KEY,
    description VARCHAR(255),
    project_type project_type_enum NOT NULL,
    title VARCHAR(255) NOT NULL
);

CREATE TABLE project_employees (
    id BIGSERIAL PRIMARY KEY,
    role role_enum NOT NULL,
    member_id BIGINT NOT NULL,
    project_id BIGINT NOT NULL,
    FOREIGN KEY (member_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);
