--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5
-- Dumped by pg_dump version 11.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: emath
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO emath;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: emath
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO emath;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: emath
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: emath
--

CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO emath;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: emath
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO emath;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: emath
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: emath
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO emath;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: emath
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO emath;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: emath
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: auth_user; Type: TABLE; Schema: public; Owner: emath
--

CREATE TABLE public.auth_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(150) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL
);


ALTER TABLE public.auth_user OWNER TO emath;

--
-- Name: auth_user_groups; Type: TABLE; Schema: public; Owner: emath
--

CREATE TABLE public.auth_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.auth_user_groups OWNER TO emath;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: emath
--

CREATE SEQUENCE public.auth_user_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_groups_id_seq OWNER TO emath;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: emath
--

ALTER SEQUENCE public.auth_user_groups_id_seq OWNED BY public.auth_user_groups.id;


--
-- Name: auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: emath
--

CREATE SEQUENCE public.auth_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_id_seq OWNER TO emath;

--
-- Name: auth_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: emath
--

ALTER SEQUENCE public.auth_user_id_seq OWNED BY public.auth_user.id;


--
-- Name: auth_user_user_permissions; Type: TABLE; Schema: public; Owner: emath
--

CREATE TABLE public.auth_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_user_user_permissions OWNER TO emath;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: emath
--

CREATE SEQUENCE public.auth_user_user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_user_permissions_id_seq OWNER TO emath;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: emath
--

ALTER SEQUENCE public.auth_user_user_permissions_id_seq OWNED BY public.auth_user_user_permissions.id;


--
-- Name: presentation_externallink; Type: TABLE; Schema: public; Owner: emath
--

CREATE TABLE public.presentation_externallink (
    id integer NOT NULL,
    content character varying(150) NOT NULL,
    url character varying(200) NOT NULL,
    target boolean NOT NULL,
    parent_e_id_id integer NOT NULL
);


ALTER TABLE public.presentation_externallink OWNER TO emath;

--
-- Name: database_externallink_id_seq; Type: SEQUENCE; Schema: public; Owner: emath
--

CREATE SEQUENCE public.database_externallink_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.database_externallink_id_seq OWNER TO emath;

--
-- Name: database_externallink_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: emath
--

ALTER SEQUENCE public.database_externallink_id_seq OWNED BY public.presentation_externallink.id;


--
-- Name: presentation_level_author; Type: TABLE; Schema: public; Owner: emath
--

CREATE TABLE public.presentation_level_author (
    id integer NOT NULL,
    level_id integer NOT NULL,
    person_id integer NOT NULL
);


ALTER TABLE public.presentation_level_author OWNER TO emath;

--
-- Name: database_level_author_id_seq; Type: SEQUENCE; Schema: public; Owner: emath
--

CREATE SEQUENCE public.database_level_author_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.database_level_author_id_seq OWNER TO emath;

--
-- Name: database_level_author_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: emath
--

ALTER SEQUENCE public.database_level_author_id_seq OWNED BY public.presentation_level_author.id;


--
-- Name: presentation_level_contributor; Type: TABLE; Schema: public; Owner: emath
--

CREATE TABLE public.presentation_level_contributor (
    id integer NOT NULL,
    level_id integer NOT NULL,
    person_id integer NOT NULL
);


ALTER TABLE public.presentation_level_contributor OWNER TO emath;

--
-- Name: database_level_contributor_id_seq; Type: SEQUENCE; Schema: public; Owner: emath
--

CREATE SEQUENCE public.database_level_contributor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.database_level_contributor_id_seq OWNER TO emath;

--
-- Name: database_level_contributor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: emath
--

ALTER SEQUENCE public.database_level_contributor_id_seq OWNED BY public.presentation_level_contributor.id;


--
-- Name: presentation_level; Type: TABLE; Schema: public; Owner: emath
--

CREATE TABLE public.presentation_level (
    id integer NOT NULL,
    "position" integer NOT NULL,
    "isPage" boolean NOT NULL,
    title character varying(100),
    "tocTitle" character varying(100),
    unit_type character varying(30) NOT NULL,
    html_title character varying(100),
    date date,
    lft integer NOT NULL,
    rght integer NOT NULL,
    tree_id integer NOT NULL,
    level integer NOT NULL,
    parent_id integer,
    "pageNum" integer,
    CONSTRAINT database_level_level_check CHECK ((level >= 0)),
    CONSTRAINT database_level_lft_check CHECK ((lft >= 0)),
    CONSTRAINT database_level_rght_check CHECK ((rght >= 0)),
    CONSTRAINT database_level_tree_id_check CHECK ((tree_id >= 0))
);


ALTER TABLE public.presentation_level OWNER TO emath;

--
-- Name: database_level_id_seq; Type: SEQUENCE; Schema: public; Owner: emath
--

CREATE SEQUENCE public.database_level_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.database_level_id_seq OWNER TO emath;

--
-- Name: database_level_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: emath
--

ALTER SEQUENCE public.database_level_id_seq OWNED BY public.presentation_level.id;


--
-- Name: presentation_para; Type: TABLE; Schema: public; Owner: emath
--

CREATE TABLE public.presentation_para (
    id integer NOT NULL,
    content jsonb NOT NULL,
    "position" integer NOT NULL,
    caption character varying(100),
    para_parent_id integer NOT NULL
);


ALTER TABLE public.presentation_para OWNER TO emath;

--
-- Name: database_para_id_seq; Type: SEQUENCE; Schema: public; Owner: emath
--

CREATE SEQUENCE public.database_para_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.database_para_id_seq OWNER TO emath;

--
-- Name: database_para_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: emath
--

ALTER SEQUENCE public.database_para_id_seq OWNED BY public.presentation_para.id;


--
-- Name: presentation_person; Type: TABLE; Schema: public; Owner: emath
--

CREATE TABLE public.presentation_person (
    id integer NOT NULL,
    first_name character varying(20) NOT NULL,
    middle_name character varying(20),
    last_name character varying(20) NOT NULL
);


ALTER TABLE public.presentation_person OWNER TO emath;

--
-- Name: database_person_id_seq; Type: SEQUENCE; Schema: public; Owner: emath
--

CREATE SEQUENCE public.database_person_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.database_person_id_seq OWNER TO emath;

--
-- Name: database_person_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: emath
--

ALTER SEQUENCE public.database_person_id_seq OWNED BY public.presentation_person.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: emath
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO emath;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: emath
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO emath;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: emath
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: emath
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO emath;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: emath
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO emath;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: emath
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: emath
--

CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO emath;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: emath
--

CREATE SEQUENCE public.django_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO emath;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: emath
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: emath
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO emath;

--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: auth_user id; Type: DEFAULT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.auth_user ALTER COLUMN id SET DEFAULT nextval('public.auth_user_id_seq'::regclass);


--
-- Name: auth_user_groups id; Type: DEFAULT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.auth_user_groups ALTER COLUMN id SET DEFAULT nextval('public.auth_user_groups_id_seq'::regclass);


--
-- Name: auth_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_user_user_permissions_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Name: presentation_externallink id; Type: DEFAULT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.presentation_externallink ALTER COLUMN id SET DEFAULT nextval('public.database_externallink_id_seq'::regclass);


--
-- Name: presentation_level id; Type: DEFAULT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.presentation_level ALTER COLUMN id SET DEFAULT nextval('public.database_level_id_seq'::regclass);


--
-- Name: presentation_level_author id; Type: DEFAULT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.presentation_level_author ALTER COLUMN id SET DEFAULT nextval('public.database_level_author_id_seq'::regclass);


--
-- Name: presentation_level_contributor id; Type: DEFAULT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.presentation_level_contributor ALTER COLUMN id SET DEFAULT nextval('public.database_level_contributor_id_seq'::regclass);


--
-- Name: presentation_para id; Type: DEFAULT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.presentation_para ALTER COLUMN id SET DEFAULT nextval('public.database_para_id_seq'::regclass);


--
-- Name: presentation_person id; Type: DEFAULT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.presentation_person ALTER COLUMN id SET DEFAULT nextval('public.database_person_id_seq'::regclass);


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: emath
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: emath
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: emath
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	2	add_permission
6	Can change permission	2	change_permission
7	Can delete permission	2	delete_permission
8	Can view permission	2	view_permission
9	Can add group	3	add_group
10	Can change group	3	change_group
11	Can delete group	3	delete_group
12	Can view group	3	view_group
13	Can add user	4	add_user
14	Can change user	4	change_user
15	Can delete user	4	delete_user
16	Can view user	4	view_user
17	Can add content type	5	add_contenttype
18	Can change content type	5	change_contenttype
19	Can delete content type	5	delete_contenttype
20	Can view content type	5	view_contenttype
21	Can add session	6	add_session
22	Can change session	6	change_session
23	Can delete session	6	delete_session
24	Can view session	6	view_session
25	Can add level	7	add_level
26	Can change level	7	change_level
27	Can delete level	7	delete_level
28	Can view level	7	view_level
29	Can add person	8	add_person
30	Can change person	8	change_person
31	Can delete person	8	delete_person
32	Can view person	8	view_person
33	Can add para	9	add_para
34	Can change para	9	change_para
35	Can delete para	9	delete_para
36	Can view para	9	view_para
37	Can add math display	10	add_mathdisplay
38	Can change math display	10	change_mathdisplay
39	Can delete math display	10	delete_mathdisplay
40	Can view math display	10	view_mathdisplay
41	Can add internal link	11	add_internallink
42	Can change internal link	11	change_internallink
43	Can delete internal link	11	delete_internallink
44	Can view internal link	11	view_internallink
45	Can add external link	12	add_externallink
46	Can change external link	12	change_externallink
47	Can delete external link	12	delete_externallink
48	Can view external link	12	view_externallink
\.


--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: emath
--

COPY public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) FROM stdin;
1	pbkdf2_sha256$150000$M3DfqSGuBH0S$SF8i22UAMV53UsOSO7Ur0W9ki+fgGhMbQlTX1bOZBOg=	2019-09-17 11:13:39.062821-06	t	yaozhilu			luyaozhiusing@gmail.com	t	t	2019-07-12 12:46:48.917551-06
\.


--
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: emath
--

COPY public.auth_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: emath
--

COPY public.auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: emath
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2019-07-12 12:49:40.293881-06	1	Person object (1)	1	[{"added": {}}]	8	1
2	2019-07-12 12:49:48.583407-06	2	Person object (2)	1	[{"added": {}}]	8	1
3	2019-07-12 12:50:13.979826-06	3	Person object (3)	1	[{"added": {}}]	8	1
4	2019-07-12 12:50:23.008422-06	4	Person object (4)	1	[{"added": {}}]	8	1
5	2019-07-12 12:50:30.009823-06	5	Person object (5)	1	[{"added": {}}]	8	1
6	2019-07-12 12:50:42.912294-06	6	Person object (6)	1	[{"added": {}}]	8	1
7	2019-07-12 12:52:27.781229-06	1	Level object (1)	1	[{"added": {}}]	7	1
8	2019-07-12 12:54:07.532557-06	2	Level object (2)	1	[{"added": {}}]	7	1
9	2019-07-12 12:54:43.951173-06	3	Level object (3)	1	[{"added": {}}]	7	1
10	2019-07-12 12:55:20.636449-06	2	Level object (2)	2	[{"changed": {"fields": ["position"]}}]	7	1
11	2019-07-12 12:55:26.511891-06	2	Level object (2)	2	[{"changed": {"fields": ["position"]}}]	7	1
12	2019-07-12 12:56:12.495415-06	4	Level object (4)	1	[{"added": {}}]	7	1
13	2019-07-12 12:57:42.196671-06	3	Level object (3)	2	[{"changed": {"fields": ["position"]}}]	7	1
14	2019-07-12 12:57:48.656738-06	2	Level object (2)	2	[{"changed": {"fields": ["position"]}}]	7	1
15	2019-07-12 12:59:42.461372-06	5	Level object (5)	1	[{"added": {}}]	7	1
16	2019-07-12 13:00:24.119849-06	6	Level object (6)	1	[{"added": {}}]	7	1
17	2019-07-12 13:01:43.031476-06	7	Level object (7)	1	[{"added": {}}]	7	1
18	2019-07-12 13:02:38.151413-06	8	Level object (8)	1	[{"added": {}}]	7	1
19	2019-07-12 13:03:48.205082-06	9	Level object (9)	1	[{"added": {}}]	7	1
20	2019-07-12 13:04:40.501401-06	10	Level object (10)	1	[{"added": {}}]	7	1
21	2019-07-12 13:04:52.999128-06	10	Level object (10)	2	[]	7	1
22	2019-07-12 13:05:49.864159-06	11	Level object (11)	1	[{"added": {}}]	7	1
23	2019-07-12 13:06:15.232574-06	12	Level object (12)	1	[{"added": {}}]	7	1
24	2019-07-12 13:06:34.652446-06	13	Level object (13)	1	[{"added": {}}]	7	1
25	2019-07-12 13:07:27.030654-06	14	Level object (14)	1	[{"added": {}}]	7	1
26	2019-07-12 13:09:39.093624-06	15	Level object (15)	1	[{"added": {}}]	7	1
27	2019-07-12 13:10:13.400567-06	16	Level object (16)	1	[{"added": {}}]	7	1
28	2019-07-12 13:10:37.512053-06	17	Level object (17)	1	[{"added": {}}]	7	1
29	2019-07-12 13:11:10.323655-06	18	Level object (18)	1	[{"added": {}}]	7	1
30	2019-07-12 13:11:59.124434-06	19	Level object (19)	1	[{"added": {}}]	7	1
31	2019-07-12 13:12:47.24603-06	20	Level object (20)	1	[{"added": {}}]	7	1
32	2019-07-12 13:13:43.209886-06	4	Level object (4)	2	[{"changed": {"fields": ["isPage"]}}]	7	1
33	2019-07-12 13:14:07.505828-06	2	Level object (2)	2	[]	7	1
34	2019-07-12 13:14:15.095542-06	4	Level object (4)	2	[]	7	1
35	2019-07-12 13:14:21.823921-06	2	Level object (2)	2	[]	7	1
36	2019-07-12 13:14:26.827013-06	3	Level object (3)	2	[]	7	1
37	2019-07-12 13:14:38.446283-06	5	Level object (5)	2	[]	7	1
38	2019-07-12 13:15:23.339573-06	1	Para object (1)	1	[{"added": {}}]	9	1
39	2019-07-12 13:15:37.861315-06	2	Para object (2)	1	[{"added": {}}]	9	1
40	2019-07-12 13:16:22.635312-06	3	Para object (3)	1	[{"added": {}}]	9	1
41	2019-07-12 13:16:39.003175-06	4	Para object (4)	1	[{"added": {}}]	9	1
42	2019-07-12 13:17:02.906115-06	5	Para object (5)	1	[{"added": {}}]	9	1
43	2019-07-12 13:17:16.226052-06	6	Para object (6)	1	[{"added": {}}]	9	1
44	2019-07-12 13:17:33.667563-06	7	Para object (7)	1	[{"added": {}}]	9	1
45	2019-07-12 13:19:05.465838-06	21	Level object (21)	1	[{"added": {}}]	7	1
46	2019-07-12 13:19:11.744173-06	1	InternalLink object (1)	1	[{"added": {}}]	11	1
47	2019-07-12 13:19:50.847805-06	8	Para object (8)	1	[{"added": {}}]	9	1
48	2019-07-12 13:20:11.357803-06	9	Para object (9)	1	[{"added": {}}]	9	1
49	2019-07-12 13:20:31.830831-06	10	Para object (10)	1	[{"added": {}}]	9	1
50	2019-07-12 13:20:48.43994-06	11	Para object (11)	1	[{"added": {}}]	9	1
51	2019-07-12 13:21:08.515702-06	12	Para object (12)	1	[{"added": {}}]	9	1
52	2019-07-12 13:22:36.79454-06	22	Level object (22)	1	[{"added": {}}]	7	1
53	2019-07-12 13:22:50.185523-06	2	InternalLink object (2)	1	[{"added": {}}]	11	1
54	2019-07-15 13:00:33.70153-06	13	Para object (13)	1	[{"added": {}}]	9	1
55	2019-07-15 13:00:57.518526-06	14	Para object (14)	1	[{"added": {}}]	9	1
56	2019-07-15 13:01:19.861239-06	15	Para object (15)	1	[{"added": {}}]	9	1
57	2019-07-15 13:01:36.057841-06	16	Para object (16)	1	[{"added": {}}]	9	1
58	2019-07-15 13:01:52.101347-06	17	Para object (17)	1	[{"added": {}}]	9	1
59	2019-07-15 13:02:13.196972-06	18	Para object (18)	1	[{"added": {}}]	9	1
60	2019-07-15 13:02:29.563147-06	19	Para object (19)	1	[{"added": {}}]	9	1
61	2019-07-15 13:02:43.833379-06	20	Para object (20)	1	[{"added": {}}]	9	1
62	2019-07-15 13:38:21.872946-06	1	Level object (1)	2	[{"changed": {"fields": ["pageNum"]}}]	7	1
63	2019-07-15 13:38:38.920954-06	4	Level object (4)	2	[{"changed": {"fields": ["pageNum"]}}]	7	1
64	2019-07-15 13:38:57.102713-06	3	Level object (3)	2	[{"changed": {"fields": ["pageNum"]}}]	7	1
65	2019-07-15 13:39:20.793047-06	5	Level object (5)	2	[{"changed": {"fields": ["pageNum"]}}]	7	1
66	2019-07-15 13:39:54.360721-06	15	Level object (15)	2	[]	7	1
67	2019-07-15 13:40:07.873015-06	4	Level object (4)	2	[]	7	1
68	2019-07-15 13:40:17.757395-06	5	Level object (5)	2	[{"changed": {"fields": ["pageNum"]}}]	7	1
69	2019-07-15 13:40:29.276839-06	15	Level object (15)	2	[{"changed": {"fields": ["pageNum"]}}]	7	1
70	2019-07-15 13:42:06.184066-06	16	Level object (16)	2	[{"changed": {"fields": ["title", "header"]}}]	7	1
71	2019-07-15 13:42:19.125775-06	16	Level object (16)	2	[{"changed": {"fields": ["pageNum"]}}]	7	1
72	2019-07-15 13:42:54.665949-06	17	Level object (17)	2	[{"changed": {"fields": ["pageNum"]}}]	7	1
73	2019-07-15 13:43:08.638317-06	18	Level object (18)	2	[{"changed": {"fields": ["pageNum"]}}]	7	1
74	2019-07-18 14:26:58.401544-06	1	Level object (1)	2	[{"changed": {"fields": ["tocTitle"]}}]	7	1
75	2019-07-18 14:27:55.837073-06	4	Level object (4)	2	[{"changed": {"fields": ["title", "tocTitle"]}}]	7	1
76	2019-07-18 14:29:03.431275-06	2	Level object (2)	2	[{"changed": {"fields": ["html_title"]}}]	7	1
77	2019-07-18 14:34:27.880028-06	21	Level object (21)	2	[{"changed": {"fields": ["tocTitle"]}}]	7	1
78	2019-07-18 14:34:46.884762-06	22	Level object (22)	2	[{"changed": {"fields": ["tocTitle"]}}]	7	1
79	2019-07-18 14:38:08.366017-06	13	Level object (13)	2	[{"changed": {"fields": ["title", "tocTitle"]}}]	7	1
80	2019-07-18 14:40:51.035602-06	2	Level object (2)	2	[{"changed": {"fields": ["position"]}}]	7	1
81	2019-07-18 14:40:58.785238-06	3	Level object (3)	2	[{"changed": {"fields": ["position"]}}]	7	1
82	2019-07-29 14:28:48.033548-06	7	Para object (7)	2	[{"changed": {"fields": ["content"]}}]	9	1
83	2019-07-29 14:30:27.618164-06	11	Para object (11)	2	[{"changed": {"fields": ["content"]}}]	9	1
84	2019-07-29 14:55:46.241048-06	7	Para object (7)	2	[{"changed": {"fields": ["content"]}}]	9	1
85	2019-07-31 13:28:58.99296-06	21	Para object (21)	1	[{"added": {}}]	9	1
86	2019-07-31 13:29:19.294335-06	22	Para object (22)	1	[{"added": {}}]	9	1
87	2019-07-31 13:29:35.496691-06	23	Para object (23)	1	[{"added": {}}]	9	1
88	2019-07-31 13:30:00.207582-06	24	Para object (24)	1	[{"added": {}}]	9	1
89	2019-07-31 13:30:20.010767-06	25	Para object (25)	1	[{"added": {}}]	9	1
90	2019-07-31 13:30:42.338209-06	26	Para object (26)	1	[{"added": {}}]	9	1
91	2019-07-31 13:30:57.773237-06	27	Para object (27)	1	[{"added": {}}]	9	1
92	2019-07-31 13:31:49.578676-06	22	Para object (22)	2	[{"changed": {"fields": ["position"]}}]	9	1
93	2019-07-31 14:35:12.721709-06	28	Para object (28)	1	[{"added": {}}]	9	1
94	2019-07-31 14:35:31.032084-06	29	Para object (29)	1	[{"added": {}}]	9	1
95	2019-07-31 14:35:51.914008-06	30	Para object (30)	1	[{"added": {}}]	9	1
96	2019-07-31 14:36:23.355474-06	31	Para object (31)	1	[{"added": {}}]	9	1
97	2019-07-31 14:36:38.76471-06	32	Para object (32)	1	[{"added": {}}]	9	1
98	2019-07-31 14:36:52.814994-06	33	Para object (33)	1	[{"added": {}}]	9	1
99	2019-07-31 14:37:13.05234-06	34	Para object (34)	1	[{"added": {}}]	9	1
100	2019-07-31 14:37:36.314679-06	35	Para object (35)	1	[{"added": {}}]	9	1
101	2019-08-12 11:37:24.03089-06	4	Para object (4)	2	[{"changed": {"fields": ["content"]}}]	9	1
102	2019-08-12 11:42:15.064609-06	6	Para object (6)	2	[{"changed": {"fields": ["content"]}}]	9	1
103	2019-08-12 11:44:08.276621-06	10	Para object (10)	2	[{"changed": {"fields": ["content"]}}]	9	1
104	2019-08-13 10:08:51.425779-06	36	Para object (36)	1	[{"added": {}}]	9	1
105	2019-08-13 10:09:36.324519-06	37	Para object (37)	1	[{"added": {}}]	9	1
106	2019-08-13 10:14:20.848166-06	38	Para object (38)	1	[{"added": {}}]	9	1
107	2019-08-13 10:16:40.981813-06	39	Para object (39)	1	[{"added": {}}]	9	1
108	2019-08-13 10:19:13.205376-06	40	Para object (40)	1	[{"added": {}}]	9	1
109	2019-08-13 10:21:03.570306-06	41	Para object (41)	1	[{"added": {}}]	9	1
110	2019-08-13 10:23:04.671846-06	42	Para object (42)	1	[{"added": {}}]	9	1
111	2019-08-13 10:24:35.316134-06	43	Para object (43)	1	[{"added": {}}]	9	1
112	2019-08-13 10:25:07.358408-06	44	Para object (44)	1	[{"added": {}}]	9	1
113	2019-08-13 10:31:32.872069-06	36	Para object (36)	2	[{"changed": {"fields": ["content"]}}]	9	1
114	2019-08-13 10:32:04.160916-06	38	Para object (38)	2	[{"changed": {"fields": ["content"]}}]	9	1
115	2019-08-13 10:32:39.424195-06	36	Para object (36)	2	[{"changed": {"fields": ["content"]}}]	9	1
116	2019-08-13 10:33:13.233604-06	36	Para object (36)	2	[{"changed": {"fields": ["content"]}}]	9	1
117	2019-08-13 10:33:42.233819-06	36	Para object (36)	2	[{"changed": {"fields": ["content"]}}]	9	1
118	2019-08-13 10:34:42.528214-06	36	Para object (36)	2	[{"changed": {"fields": ["content"]}}]	9	1
119	2019-08-13 10:39:19.182138-06	36	Para object (36)	2	[]	9	1
120	2019-08-13 10:40:28.526721-06	36	Para object (36)	2	[{"changed": {"fields": ["content"]}}]	9	1
121	2019-08-13 10:41:31.830675-06	39	Para object (39)	2	[{"changed": {"fields": ["content"]}}]	9	1
122	2019-08-13 10:41:57.700566-06	40	Para object (40)	2	[{"changed": {"fields": ["content"]}}]	9	1
123	2019-08-13 10:42:13.203983-06	41	Para object (41)	2	[{"changed": {"fields": ["content"]}}]	9	1
124	2019-08-13 10:42:33.829184-06	42	Para object (42)	2	[{"changed": {"fields": ["content"]}}]	9	1
125	2019-08-13 11:35:44.823121-06	10	Para object (10)	2	[{"changed": {"fields": ["content"]}}]	9	1
126	2019-08-13 12:12:35.520052-06	4	Para object (4)	2	[{"changed": {"fields": ["content"]}}]	9	1
127	2019-08-13 12:13:27.354815-06	4	Para object (4)	2	[{"changed": {"fields": ["content"]}}]	9	1
128	2019-08-13 12:14:08.637105-06	4	Para object (4)	2	[{"changed": {"fields": ["content"]}}]	9	1
129	2019-08-14 13:03:13.694685-06	4	Para object (4)	2	[{"changed": {"fields": ["content"]}}]	9	1
130	2019-08-16 13:26:37.954218-06	23	Level object (23)	1	[{"added": {}}]	7	1
131	2019-08-16 13:27:48.861-06	24	Level object (24)	1	[{"added": {}}]	7	1
132	2019-08-16 13:28:41.355706-06	25	Level object (25)	1	[{"added": {}}]	7	1
133	2019-08-16 13:29:50.024867-06	26	Level object (26)	1	[{"added": {}}]	7	1
134	2019-08-16 13:31:44.941258-06	45	Para object (45)	1	[{"added": {}}]	9	1
135	2019-08-16 13:33:07.598355-06	46	Para object (46)	1	[{"added": {}}]	9	1
136	2019-08-16 13:33:54.458465-06	47	Para object (47)	1	[{"added": {}}]	9	1
137	2019-08-16 13:34:51.745358-06	48	Para object (48)	1	[{"added": {}}]	9	1
138	2019-08-16 13:35:11.799292-06	47	Para object (47)	2	[{"changed": {"fields": ["position"]}}]	9	1
139	2019-08-16 13:36:37.106198-06	49	Para object (49)	1	[{"added": {}}]	9	1
140	2019-08-16 13:37:03.413955-06	50	Para object (50)	1	[{"added": {}}]	9	1
141	2019-08-16 13:37:33.805929-06	51	Para object (51)	1	[{"added": {}}]	9	1
142	2019-08-19 12:01:16.827292-06	5	Level object (5)	2	[{"changed": {"fields": ["pageNum", "isPage"]}}]	7	1
143	2019-08-19 12:02:31.939345-06	5	Level object (5)	2	[{"changed": {"fields": ["pageNum", "isPage"]}}]	7	1
144	2019-08-21 14:51:23.788907-06	23	Level object (23)	2	[{"changed": {"fields": ["tocTitle"]}}]	7	1
145	2019-08-21 14:51:28.201362-06	24	Level object (24)	2	[{"changed": {"fields": ["tocTitle"]}}]	7	1
146	2019-08-21 14:51:33.406586-06	25	Level object (25)	2	[{"changed": {"fields": ["tocTitle"]}}]	7	1
147	2019-08-21 14:51:43.010034-06	25	Level object (25)	2	[]	7	1
148	2019-08-21 14:51:47.90001-06	26	Level object (26)	2	[{"changed": {"fields": ["tocTitle"]}}]	7	1
149	2019-08-22 11:36:36.736035-06	49	Para object (49)	2	[{"changed": {"fields": ["content"]}}]	9	1
150	2019-08-22 11:37:53.16706-06	49	Para object (49)	2	[{"changed": {"fields": ["content"]}}]	9	1
151	2019-08-23 14:49:20.150561-06	51	Para object (51)	3		9	1
152	2019-08-23 14:49:20.220685-06	49	Para object (49)	3		9	1
153	2019-08-23 14:49:20.223364-06	47	Para object (47)	3		9	1
154	2019-08-23 14:49:20.224585-06	45	Para object (45)	3		9	1
155	2019-08-23 14:49:20.227161-06	36	Para object (36)	3		9	1
156	2019-08-23 14:49:20.229194-06	13	Para object (13)	3		9	1
157	2019-08-23 14:49:20.230801-06	1	Para object (1)	3		9	1
158	2019-08-23 14:49:20.232052-06	48	Para object (48)	3		9	1
159	2019-08-23 14:49:20.233295-06	46	Para object (46)	3		9	1
160	2019-08-23 14:49:20.234568-06	37	Para object (37)	3		9	1
161	2019-08-23 14:49:20.236523-06	28	Para object (28)	3		9	1
162	2019-08-23 14:49:20.237882-06	21	Para object (21)	3		9	1
163	2019-08-23 14:49:20.239351-06	14	Para object (14)	3		9	1
164	2019-08-23 14:49:20.240501-06	2	Para object (2)	3		9	1
165	2019-08-23 14:49:20.241693-06	38	Para object (38)	3		9	1
166	2019-08-23 14:49:20.242876-06	29	Para object (29)	3		9	1
167	2019-08-23 14:49:20.245232-06	23	Para object (23)	3		9	1
168	2019-08-23 14:49:20.246395-06	15	Para object (15)	3		9	1
169	2019-08-23 14:49:20.247529-06	3	Para object (3)	3		9	1
170	2019-08-23 14:49:20.248834-06	50	Para object (50)	3		9	1
171	2019-08-23 14:49:20.250118-06	39	Para object (39)	3		9	1
172	2019-08-23 14:49:20.251242-06	30	Para object (30)	3		9	1
173	2019-08-23 14:49:20.252347-06	22	Para object (22)	3		9	1
174	2019-08-23 14:49:20.253469-06	16	Para object (16)	3		9	1
175	2019-08-23 14:49:20.254723-06	4	Para object (4)	3		9	1
176	2019-08-23 14:49:20.255785-06	40	Para object (40)	3		9	1
177	2019-08-23 14:49:20.256973-06	31	Para object (31)	3		9	1
178	2019-08-23 14:49:20.258104-06	24	Para object (24)	3		9	1
179	2019-08-23 14:49:20.259383-06	17	Para object (17)	3		9	1
180	2019-08-23 14:49:20.260663-06	5	Para object (5)	3		9	1
181	2019-08-23 14:49:20.261943-06	41	Para object (41)	3		9	1
182	2019-08-23 14:49:20.26317-06	25	Para object (25)	3		9	1
183	2019-08-23 14:49:20.264192-06	18	Para object (18)	3		9	1
184	2019-08-23 14:49:20.265169-06	6	Para object (6)	3		9	1
185	2019-08-23 14:49:20.266545-06	42	Para object (42)	3		9	1
186	2019-08-23 14:49:20.268311-06	33	Para object (33)	3		9	1
187	2019-08-23 14:49:20.269384-06	32	Para object (32)	3		9	1
188	2019-08-23 14:49:20.270504-06	26	Para object (26)	3		9	1
189	2019-08-23 14:49:20.272184-06	20	Para object (20)	3		9	1
190	2019-08-23 14:49:20.273272-06	19	Para object (19)	3		9	1
191	2019-08-23 14:49:20.274628-06	7	Para object (7)	3		9	1
192	2019-08-23 14:49:20.276106-06	43	Para object (43)	3		9	1
193	2019-08-23 14:49:20.277569-06	34	Para object (34)	3		9	1
194	2019-08-23 14:49:20.278539-06	27	Para object (27)	3		9	1
195	2019-08-23 14:49:20.279736-06	8	Para object (8)	3		9	1
196	2019-08-23 14:49:20.280645-06	44	Para object (44)	3		9	1
197	2019-08-23 14:49:20.281545-06	35	Para object (35)	3		9	1
198	2019-08-23 14:49:20.282489-06	9	Para object (9)	3		9	1
199	2019-08-23 14:49:20.283398-06	10	Para object (10)	3		9	1
200	2019-08-23 14:49:20.284303-06	11	Para object (11)	3		9	1
201	2019-08-23 14:49:20.285192-06	12	Para object (12)	3		9	1
202	2019-08-25 23:34:10.663205-06	52	Para object (52)	1	[{"added": {}}]	9	1
203	2019-08-25 23:35:44.52583-06	53	Para object (53)	1	[{"added": {}}]	9	1
204	2019-08-26 12:31:44.153876-06	52	Para object (52)	2	[]	9	1
205	2019-08-26 12:31:47.826795-06	53	Para object (53)	2	[]	9	1
206	2019-08-26 13:19:03.333873-06	53	Para object (53)	2	[]	9	1
207	2019-08-26 13:45:22.797914-06	54	Para object (54)	1	[{"added": {}}]	9	1
208	2019-08-26 13:46:12.249776-06	55	Para object (55)	1	[{"added": {}}]	9	1
209	2019-08-26 13:47:38.737863-06	56	Para object (56)	1	[{"added": {}}]	9	1
210	2019-08-26 13:48:00.178103-06	57	Para object (57)	1	[{"added": {}}]	9	1
211	2019-08-26 13:48:06.462801-06	57	Para object (57)	2	[]	9	1
212	2019-08-26 13:49:58.536531-06	58	Para object (58)	1	[{"added": {}}]	9	1
213	2019-08-26 14:04:59.867658-06	54	Para object (54)	2	[{"changed": {"fields": ["content"]}}]	9	1
214	2019-08-26 14:08:52.910028-06	54	Para object (54)	2	[{"changed": {"fields": ["content"]}}]	9	1
215	2019-08-26 14:12:55.746178-06	54	Para object (54)	2	[{"changed": {"fields": ["content"]}}]	9	1
216	2019-08-26 14:13:49.70856-06	54	Para object (54)	2	[{"changed": {"fields": ["content"]}}]	9	1
217	2019-08-26 14:20:39.163002-06	58	Para object (58)	2	[{"changed": {"fields": ["content"]}}]	9	1
218	2019-08-26 14:23:20.541121-06	58	Para object (58)	2	[{"changed": {"fields": ["content"]}}]	9	1
219	2019-08-26 14:45:53.879092-06	58	Para object (58)	2	[{"changed": {"fields": ["content"]}}]	9	1
220	2019-08-28 11:02:10.656821-06	54	Para object (54)	2	[{"changed": {"fields": ["content"]}}]	9	1
221	2019-08-28 14:17:04.850445-06	54	Para object (54)	2	[{"changed": {"fields": ["content"]}}]	9	1
222	2019-08-28 14:28:10.920109-06	54	Para object (54)	2	[{"changed": {"fields": ["content"]}}]	9	1
223	2019-08-28 14:38:49.535453-06	54	Para object (54)	2	[{"changed": {"fields": ["content"]}}]	9	1
224	2019-08-29 11:09:54.449937-06	54	Para object (54)	2	[]	9	1
225	2019-08-29 11:37:37.307681-06	54	Para object (54)	2	[{"changed": {"fields": ["content"]}}]	9	1
226	2019-08-29 11:37:43.984471-06	54	Para object (54)	2	[]	9	1
227	2019-08-29 11:41:03.130703-06	54	Para object (54)	2	[{"changed": {"fields": ["content"]}}]	9	1
228	2019-08-29 15:04:48.974364-06	58	Para object (58)	2	[{"changed": {"fields": ["content"]}}]	9	1
229	2019-09-03 11:26:08.99867-06	59	Para object (59)	1	[{"added": {}}]	9	1
230	2019-09-03 11:56:36.654005-06	60	Para object (60)	1	[{"added": {}}]	9	1
231	2019-09-03 11:56:57.504323-06	61	Para object (61)	1	[{"added": {}}]	9	1
232	2019-09-03 12:03:10.201494-06	62	Para object (62)	1	[{"added": {}}]	9	1
233	2019-09-03 12:03:39.268626-06	63	Para object (63)	1	[{"added": {}}]	9	1
234	2019-09-03 12:06:56.725428-06	64	Para object (64)	1	[{"added": {}}]	9	1
235	2019-09-03 12:07:35.660527-06	65	Para object (65)	1	[{"added": {}}]	9	1
236	2019-09-03 12:08:42.254894-06	27	Level object (27)	1	[{"added": {}}]	7	1
237	2019-09-03 12:09:20.704779-06	66	Para object (66)	1	[{"added": {}}]	9	1
238	2019-09-03 12:09:49.405277-06	67	Para object (67)	1	[{"added": {}}]	9	1
239	2019-09-03 12:10:55.004355-06	27	Level object (27)	2	[{"changed": {"fields": ["position"]}}]	7	1
240	2019-09-03 12:24:55.252917-06	28	Level object (28)	1	[{"added": {}}]	7	1
241	2019-09-03 12:25:30.223961-06	22	Level object (22)	2	[{"changed": {"fields": ["parent"]}}]	7	1
242	2019-09-03 12:25:38.36338-06	21	Level object (21)	2	[{"changed": {"fields": ["parent"]}}]	7	1
243	2019-09-03 12:26:08.681874-06	21	Level object (21)	2	[{"changed": {"fields": ["tocTitle"]}}]	7	1
244	2019-09-03 12:26:18.608841-06	22	Level object (22)	2	[{"changed": {"fields": ["tocTitle"]}}]	7	1
245	2019-09-03 14:39:06.250686-06	64	Para object (64)	2	[{"changed": {"fields": ["content"]}}]	9	1
246	2019-09-03 14:40:04.003184-06	62	Para object (62)	2	[{"changed": {"fields": ["content"]}}]	9	1
247	2019-09-18 12:11:13.759082-06	15	Level object (15)	3		7	1
248	2019-09-18 12:11:13.796982-06	16	Level object (16)	3		7	1
249	2019-09-18 12:11:13.79857-06	23	Level object (23)	3		7	1
250	2019-09-18 12:11:13.800817-06	24	Level object (24)	3		7	1
251	2019-09-18 12:11:13.802267-06	25	Level object (25)	3		7	1
252	2019-09-18 12:11:13.803651-06	26	Level object (26)	3		7	1
253	2019-09-18 12:11:13.805165-06	17	Level object (17)	3		7	1
254	2019-09-18 12:11:13.806515-06	18	Level object (18)	3		7	1
255	2019-09-18 12:11:13.807946-06	6	Level object (6)	3		7	1
256	2019-09-18 12:11:13.809058-06	19	Level object (19)	3		7	1
257	2019-09-18 12:11:13.810009-06	20	Level object (20)	3		7	1
258	2019-09-18 12:11:13.81148-06	7	Level object (7)	3		7	1
259	2019-09-18 12:11:13.814132-06	8	Level object (8)	3		7	1
260	2019-09-18 12:11:13.815298-06	9	Level object (9)	3		7	1
261	2019-09-18 12:11:13.817206-06	10	Level object (10)	3		7	1
262	2019-09-18 12:11:13.818392-06	11	Level object (11)	3		7	1
263	2019-09-18 12:11:13.819436-06	12	Level object (12)	3		7	1
264	2019-09-18 12:11:13.820907-06	13	Level object (13)	3		7	1
265	2019-09-18 12:11:13.822324-06	14	Level object (14)	3		7	1
266	2019-09-18 12:12:09.92484-06	5	Level object (5)	2	[{"changed": {"fields": ["pageNum", "isPage", "date"]}}]	7	1
267	2019-09-18 12:16:15.27864-06	21	Level object (21)	2	[{"changed": {"fields": ["title", "tocTitle"]}}]	7	1
268	2019-09-18 12:16:23.303578-06	22	Level object (22)	2	[{"changed": {"fields": ["title", "tocTitle"]}}]	7	1
269	2019-09-23 12:14:37.198689-06	68	Para object (68)	1	[{"added": {}}]	9	1
270	2019-09-23 12:14:59.292883-06	69	Para object (69)	1	[{"added": {}}]	9	1
271	2019-09-23 12:20:19.331837-06	70	Para object (70)	1	[{"added": {}}]	9	1
272	2019-09-23 12:21:35.014454-06	71	Para object (71)	1	[{"added": {}}]	9	1
273	2019-09-23 12:22:11.586355-06	72	Para object (72)	1	[{"added": {}}]	9	1
274	2019-09-23 12:22:58.426652-06	73	Para object (73)	1	[{"added": {}}]	9	1
275	2019-09-23 12:23:30.403094-06	74	Para object (74)	1	[{"added": {}}]	9	1
276	2019-09-23 12:25:21.054658-06	74	Para object (74)	2	[]	9	1
277	2019-09-23 12:26:00.677784-06	75	Para object (75)	1	[{"added": {}}]	9	1
278	2019-09-23 12:29:14.660733-06	56	Para object (56)	2	[{"changed": {"fields": ["content"]}}]	9	1
279	2019-09-23 12:31:36.889-06	75	Para object (75)	2	[{"changed": {"fields": ["content"]}}]	9	1
280	2019-09-23 12:35:54.633894-06	56	Para object (56)	2	[{"changed": {"fields": ["content"]}}]	9	1
281	2019-09-23 12:36:48.16857-06	56	Para object (56)	2	[{"changed": {"fields": ["content"]}}]	9	1
282	2019-09-23 12:42:14.956379-06	29	Level object (29)	1	[{"added": {}}]	7	1
283	2019-09-23 12:42:40.761928-06	75	Para object (75)	2	[{"changed": {"fields": ["position", "para_parent"]}}]	9	1
284	2019-09-24 14:53:16.101595-06	53	Para object (53)	2	[{"changed": {"fields": ["content"]}}]	9	1
285	2019-09-24 14:53:49.669143-06	53	Para object (53)	2	[{"changed": {"fields": ["content"]}}]	9	1
286	2019-09-25 11:02:44.343761-06	52	Para object (52)	2	[{"changed": {"fields": ["content"]}}]	9	1
287	2019-09-25 11:03:08.649393-06	52	Para object (52)	2	[{"changed": {"fields": ["content"]}}]	9	1
288	2019-09-25 13:03:43.706627-06	73	Para object (73)	2	[{"changed": {"fields": ["content"]}}]	9	1
289	2019-09-25 13:05:11.92547-06	73	Para object (73)	2	[{"changed": {"fields": ["content"]}}]	9	1
290	2019-09-25 13:07:50.870999-06	73	Para object (73)	2	[]	9	1
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: emath
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	permission
3	auth	group
4	auth	user
5	contenttypes	contenttype
6	sessions	session
12	presentation	externallink
11	presentation	internallink
7	presentation	level
10	presentation	mathdisplay
9	presentation	para
8	presentation	person
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: emath
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2019-07-12 12:46:02.580133-06
2	auth	0001_initial	2019-07-12 12:46:02.620078-06
3	admin	0001_initial	2019-07-12 12:46:02.677782-06
4	admin	0002_logentry_remove_auto_add	2019-07-12 12:46:02.693173-06
5	admin	0003_logentry_add_action_flag_choices	2019-07-12 12:46:02.702098-06
6	contenttypes	0002_remove_content_type_name	2019-07-12 12:46:02.722562-06
7	auth	0002_alter_permission_name_max_length	2019-07-12 12:46:02.728064-06
8	auth	0003_alter_user_email_max_length	2019-07-12 12:46:02.739623-06
9	auth	0004_alter_user_username_opts	2019-07-12 12:46:02.748452-06
10	auth	0005_alter_user_last_login_null	2019-07-12 12:46:02.757985-06
11	auth	0006_require_contenttypes_0002	2019-07-12 12:46:02.759867-06
12	auth	0007_alter_validators_add_error_messages	2019-07-12 12:46:02.768024-06
13	auth	0008_alter_user_username_max_length	2019-07-12 12:46:02.781183-06
14	auth	0009_alter_user_last_name_max_length	2019-07-12 12:46:02.79147-06
15	auth	0010_alter_group_name_max_length	2019-07-12 12:46:02.800199-06
16	auth	0011_update_proxy_permissions	2019-07-12 12:46:02.809376-06
18	sessions	0001_initial	2019-07-12 12:46:02.910974-06
17	presentation	0001_initial	2019-07-12 12:46:02.874633-06
19	presentation	0002_level_pagenum	2019-07-15 13:35:03.251763-06
20	presentation	0003_auto_20190715_1336	2019-07-15 13:36:55.30088-06
21	presentation	0004_auto_20190715_1338	2019-07-15 13:38:03.19968-06
22	presentation	0005_auto_20190718_1424	2019-07-18 14:25:02.846813-06
23	presentation	0006_auto_20190801_1505	2019-08-01 15:05:52.465998-06
24	presentation	0007_auto_20190823_1441	2019-08-23 14:49:28.839617-06
25	presentation	0008_auto_20190823_1443	2019-08-23 14:49:28.88177-06
26	presentation	0009_remove_para_content1	2019-08-23 14:49:28.891657-06
27	presentation	0010_auto_20190823_1450	2019-08-23 14:50:14.199133-06
28	presentation	0011_remove_para_para_type	2019-08-23 14:56:00.507491-06
29	presentation	0012_auto_20190903_1137	2019-09-03 11:38:05.467242-06
30	presentation	0002_auto_20190916_1134	2019-09-16 11:34:11.139763-06
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: emath
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
rdz9o7k2uekv8hkihlfpywre5emnp6cz	OWY4ZDAyY2JjZWJkYWI1Y2Q0YWU4OTM5ZjY1MzY5MzY0YjE1MWQ2ZTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjNzRhMjNhZDM2ZjU0ZmViNmYzNjg5MTFlYWRlMTc0OTJjMzg3MGU1In0=	2019-07-26 12:46:58.753973-06
8539eehje8l32073c6jo7wywnpxit2mh	OWY4ZDAyY2JjZWJkYWI1Y2Q0YWU4OTM5ZjY1MzY5MzY0YjE1MWQ2ZTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjNzRhMjNhZDM2ZjU0ZmViNmYzNjg5MTFlYWRlMTc0OTJjMzg3MGU1In0=	2019-08-12 14:24:07.271503-06
6fgmgvpi05cy4yo3m5a91ws4lgbdhoxy	OWY4ZDAyY2JjZWJkYWI1Y2Q0YWU4OTM5ZjY1MzY5MzY0YjE1MWQ2ZTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjNzRhMjNhZDM2ZjU0ZmViNmYzNjg5MTFlYWRlMTc0OTJjMzg3MGU1In0=	2019-08-26 15:19:40.64501-06
kjy919mkl3wngvr2db4fvpk8w68gxrnz	OWY4ZDAyY2JjZWJkYWI1Y2Q0YWU4OTM5ZjY1MzY5MzY0YjE1MWQ2ZTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjNzRhMjNhZDM2ZjU0ZmViNmYzNjg5MTFlYWRlMTc0OTJjMzg3MGU1In0=	2019-09-10 15:03:08.869941-06
x55hh8xkx8i0glmjwt3icvqynmnriwn6	OWY4ZDAyY2JjZWJkYWI1Y2Q0YWU4OTM5ZjY1MzY5MzY0YjE1MWQ2ZTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjNzRhMjNhZDM2ZjU0ZmViNmYzNjg5MTFlYWRlMTc0OTJjMzg3MGU1In0=	2019-10-01 11:13:39.072477-06
\.


--
-- Data for Name: presentation_externallink; Type: TABLE DATA; Schema: public; Owner: emath
--

COPY public.presentation_externallink (id, content, url, target, parent_e_id_id) FROM stdin;
\.


--
-- Data for Name: presentation_level; Type: TABLE DATA; Schema: public; Owner: emath
--

COPY public.presentation_level (id, "position", "isPage", title, "tocTitle", unit_type, html_title, date, lft, rght, tree_id, level, parent_id, "pageNum") FROM stdin;
5	0	f	Higher Dimensions and the Vector Space ℝn	Higher Dimensions and the Vector Space ℝn	chapter	Linear Algebra in Euclidean Space	2019-09-18	5	22	1	2	3	\N
21	0	t	Double the Pennies	Double the Pennies	eg	Linear Algebra in Euclidean Space	2019-07-12	49	52	1	2	28	0
22	1	t	Brake Distance Depends in a Quadratic Way on Speed	Brake Distance Depends in a Quadratic Way on Speed	eg	Linear Algebra in Euclidean Space	2019-07-12	53	56	1	2	28	0
4	0	t	Linear Algebra in ℝn	Introduction	intro	Linear Algebra in Euclidean Space	2019-07-12	2	3	1	1	1	1
1	0	f	Linear Algebra in Rn	Linear Algebra in Rn	Book	Linear Algebra in Euclidean Space	2019-06-03	1	58	1	0	\N	\N
2	2	f	The Vector Space ℝn	The Vector Space ℝn	Part	Linear Algebra in Euclidean Space	2019-07-12	38	47	1	1	1	0
3	1	f	Determinants and a Second Encounter with Spaces and Linear Maps	Determinants and a Second Encounter with Spaces and Linear Maps	part	Linear Algebra in Euclidean Space	2019-07-12	4	37	1	1	1	\N
28	3	f	Appendix	Appendix	part	Linear Algebra in Euclidean Space	2019-09-03	48	57	1	1	1	\N
27	7	f	\N	\N	text	\N	2019-09-03	54	55	1	3	22	\N
29	7	f	\N	\N	text	\N	2019-09-23	50	51	1	3	21	\N
\.


--
-- Data for Name: presentation_level_author; Type: TABLE DATA; Schema: public; Owner: emath
--

COPY public.presentation_level_author (id, level_id, person_id) FROM stdin;
1	1	1
\.


--
-- Data for Name: presentation_level_contributor; Type: TABLE DATA; Schema: public; Owner: emath
--

COPY public.presentation_level_contributor (id, level_id, person_id) FROM stdin;
1	1	2
2	1	3
3	1	4
\.


--
-- Data for Name: presentation_para; Type: TABLE DATA; Schema: public; Owner: emath
--

COPY public.presentation_para (id, content, "position", caption, para_parent_id) FROM stdin;
55	{"list": "", "text": "Such examples demonstrate how easy it is to comprehend linear relationships and to work with them. In contrast, non-linear relationships can be counter-intuitive and much harder to work with. – For an example of the counter intuitive nature of non linear relationships I'll offer you a deal:", "table": ""}	3	null	4
57	{"list": "", "text": "So far for a first encounter with ‘linear’ vs. ‘nonlinear’. In this introductory ebook on Linear Algebra we will encounter", "table": ""}	5	null	4
58	{"list": {"tag": "ol", "content": ["Vector spaces: the environment within which linear processes can be described", "Systems of linear equations, and methods for solving them", "Matrices as a vast extension of the system of real numbers", "Linear transformations and their relationship to matrices", "Determinants and their relationship to oriented volume"]}, "text": "", "table": ""}	6	null	4
56	{"list": "", "text": "I give you $100 today, if over the next 14 days you agree to give me 1 penny today, 2 pennies tomorrow, and on each day double the number of pennies of the day before. –<iLink id = '21'> Does this sound like a good deal to you?</iLink>", "table": ""}	4	null	4
53	{"list": "", "text": "Let us begin with a first impression of the distinction< between ‘linear’ and ‘non-linear’ processes:", "table": ""}	1	null	4
52	{"list": "", "text": "<b> This ebook covers basic topics of linear algebra. It deals with vector spaces </b>, their subspaces and linear transformations between them. We emphasize a geometric/visual view of the subject which makes it particularly useful for science and engineering students. Beyond our immediate concerns, we also provide a good foundations for multivariable differential calculus and its applications, in particular certain aspects of differential equations and differential geometry. – Background knowledge assumed of a reader is very modest: basic algebra and knowledge of trigonometric functions.", "table": ""}	0	null	4
54	{"list": {"tag": "ul", "content": ["Suppose you are traveling at constant speed of 80km/h. After one hour you will have covered a distance of 80km. After 2 hours you will have covered a distance of 160km; after 3 hours a distance of 240km, etc. – Thus 'time traveled' and 'distance covered' are in a linear relationship: <MathDisplay>\\\\text{distance traveled in $k$ hours} = k\\\\cdot \\\\text{(distance traveled in $1$ hour)} </MathDisplay>", "Suppose each day you put a marble into some bag. Then you know that after 1 day you will have 1 marble, after 2 days you will have two marbles; after 3 days you will have 3 marbles in the bag, etc. – This is an example of a linear relationship:<MathDisplay>\\\\text{no. of marbles after $k$ days} = k\\\\cdot \\\\text{(no. of marbles after $1$ day)}</MathDisplay>", "When driving a car, let’s make a table which records the distance it takes to brake the vehicle to a full stop from a given speed. – Such a table <iLink id = '22'> reveals a quadratic relationship </iLink> between speed and brake distance to a full stop.", ["In a cell growth experiment you might encounter a table like the following", {"table": {"data": [["Day", "1", "2", "3", "4", "5", "6", "7"], ["Cell Mass", "m", "2m", "4m", "8m", "16m", "32m", "64m"]], "direction": "h"}}, "This corresponds to a substance which doubles itself every day. Thus ‘number of days passed’ and ‘cell mass’ are not in a linear relationship but rather in an exponential relationship cell mass on day k = <MathDisplay inline = 'true'>2^{k-1}\\\\cdot</MathDisplay> ⋅ (cell mass on day 1)"]]}, "text": "", "table": ""}	2	null	4
59	{"list": "", "text": "The distance which a car travels while brakes are being applied during an emergency breaking maneuver depends upon the initial speed and a number of environmental conditions such as road, tires, brake force, etc. Let us assume that these environmental conditions remain unchanged throughout while the following data were collected.", "table": ""}	0	null	22
60	{"list": "", "text": "", "table": {"data": [["Speed [km/h]", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"], ["Brake Distance [m]", ".5", "2", "4.5", "8", "12.5", "18", "23.5", "32", "40.5", "50"]], "direction": "h"}}	1	null	22
61	{"list": "", "text": "Now let us observe the following:", "table": ""}	2	null	22
63	{"list": "", "text": "We may summarize this observation as follows: if the brake distance at speed s[km/h] equals d[m], then", "table": ""}	4	null	22
65	{"list": "", "text": "Thus the brake distance is in a square, or a quadratic, relationship with the initial speed.", "table": ""}	6	null	22
66	{"list": "", "text": "assume that brake distance depends linearly on speed. – Question: Given that it takes .5m to bring the car to a full stop from an initial speed of 10km/h, what would the brake distance be from an initial speed of 80km/h?", "table": ""}	0	For a thought experiment	27
67	{"list": "", "text": "100km/h = 8⋅10km/h. So the brake distance should be 8⋅(0.5)=4m – a big difference from the truthful 30m in the above table.", "table": ""}	1	Answer	27
64	{"list": "", "text": "the brake distance at speed <MathDisplay inline>(k\\\\cdot s)</MathDisplay>[km/h] equals <MathDisplay inline = 'true'>(k^2 \\\\cdot d)</MathDisplay>[m].", "table": ""}	5	null	22
62	{"list": {"tag": "ol", "content": ["While a speed of 20km/h is 2⋅10km/h, the brake distance went up by a factor of <MathDisplay inline>4=2^2</MathDisplay>.", "While a speed of 30km/h is 3⋅10km/h, the brake distance went up by a factor of <MathDisplay inline>9=3^2</MathDisplay>.", "While a speed of 40km/h is 4⋅10km/h, the brake distance went up by a factor of <MathDisplay inline>16=4^2</MathDisplay>.", "etc."]}, "text": "", "table": ""}	3	null	22
68	{"list": "", "text": "So, what was this deal again? – Your prof offers you $100 today if you agree to pay 1 penny today, 2 pennies tomorrow, 4 pennies the following day, etc. for the next 14 days.", "table": ""}	0	null	21
69	{"list": "", "text": "On the surface this sounds like a great deal: collect $100 while only having to pay a few pennies back for each of the next 14 days. But before committing to such a deal, perhaps it is better to work out carefully what actually happens here.", "table": ""}	1	null	21
70	{"list": "", "text": "", "table": {"data": [["day", 0, 1, 2, 3, 4, 5, 6, 7], ["pennies", 1, 2, 4, 8, 16, 32, 64, 128], ["day", 8, 9, 10, 11, 12, 13, 14], ["pennies", 256, 512, 1024, 2048, 4096, 8192, 16384]], "direction": "h"}}	2	null	21
71	{"list": "", "text": "Oooopss! – Those numbers of pennies start out small. But they sure grow rapidly! So you see that, on the 14-th day alone, you’d pay your prof back everything (s)he gave you, plus you'd be handing over an additional $63.84.", "table": ""}	3	null	21
72	{"list": "", "text": "This is an example of exponential growth, a ‘gotcha’ in many ways:", "table": ""}	4	null	21
74	{"list": "", "text": "For another impression of ‘exponential growth’, work out what happens if you let the penny doubling return scheme run for 21 days instead of for 14.", "table": ""}	6	null	21
75	{"list": "", "text": "Beware of debt: interest is compounded, and this leads to exponential growth of debt if no payments are being made – The same kind of ‘gotcha’ as the example above.", "table": ""}	0	null	29
73	{"list": "", "text": "<center>number of pennies paid on day k = <MathDisplay inline = 'true'> 2^k </MathDisplay> </center>", "table": ""}	5	null	21
\.


--
-- Data for Name: presentation_person; Type: TABLE DATA; Schema: public; Owner: emath
--

COPY public.presentation_person (id, first_name, middle_name, last_name) FROM stdin;
1	fn1	md1	ln1
2	fn2	\N	ln2
3	fn3	md3	ln3
4	fn4	\N	ln4
5	fn5	\N	ln5
6	fn6	\N	ln6
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: emath
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: emath
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: emath
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 48, true);


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: emath
--

SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);


--
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: emath
--

SELECT pg_catalog.setval('public.auth_user_id_seq', 1, true);


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: emath
--

SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);


--
-- Name: database_externallink_id_seq; Type: SEQUENCE SET; Schema: public; Owner: emath
--

SELECT pg_catalog.setval('public.database_externallink_id_seq', 1, false);


--
-- Name: database_level_author_id_seq; Type: SEQUENCE SET; Schema: public; Owner: emath
--

SELECT pg_catalog.setval('public.database_level_author_id_seq', 1, true);


--
-- Name: database_level_contributor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: emath
--

SELECT pg_catalog.setval('public.database_level_contributor_id_seq', 3, true);


--
-- Name: database_level_id_seq; Type: SEQUENCE SET; Schema: public; Owner: emath
--

SELECT pg_catalog.setval('public.database_level_id_seq', 29, true);


--
-- Name: database_para_id_seq; Type: SEQUENCE SET; Schema: public; Owner: emath
--

SELECT pg_catalog.setval('public.database_para_id_seq', 75, true);


--
-- Name: database_person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: emath
--

SELECT pg_catalog.setval('public.database_person_id_seq', 6, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: emath
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 290, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: emath
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 12, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: emath
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 30, true);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_user_id_group_id_94350c0c_uniq; Type: CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq UNIQUE (user_id, group_id);


--
-- Name: auth_user auth_user_pkey; Type: CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_permission_id_14a6b632_uniq; Type: CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq UNIQUE (user_id, permission_id);


--
-- Name: auth_user auth_user_username_key; Type: CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);


--
-- Name: presentation_externallink database_externallink_pkey; Type: CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.presentation_externallink
    ADD CONSTRAINT database_externallink_pkey PRIMARY KEY (id);


--
-- Name: presentation_level_author database_level_author_level_id_person_id_1780d99b_uniq; Type: CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.presentation_level_author
    ADD CONSTRAINT database_level_author_level_id_person_id_1780d99b_uniq UNIQUE (level_id, person_id);


--
-- Name: presentation_level_author database_level_author_pkey; Type: CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.presentation_level_author
    ADD CONSTRAINT database_level_author_pkey PRIMARY KEY (id);


--
-- Name: presentation_level_contributor database_level_contributor_level_id_person_id_b7adb61e_uniq; Type: CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.presentation_level_contributor
    ADD CONSTRAINT database_level_contributor_level_id_person_id_b7adb61e_uniq UNIQUE (level_id, person_id);


--
-- Name: presentation_level_contributor database_level_contributor_pkey; Type: CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.presentation_level_contributor
    ADD CONSTRAINT database_level_contributor_pkey PRIMARY KEY (id);


--
-- Name: presentation_level database_level_pkey; Type: CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.presentation_level
    ADD CONSTRAINT database_level_pkey PRIMARY KEY (id);


--
-- Name: presentation_para database_para_pkey; Type: CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.presentation_para
    ADD CONSTRAINT database_para_pkey PRIMARY KEY (id);


--
-- Name: presentation_person database_person_pkey; Type: CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.presentation_person
    ADD CONSTRAINT database_person_pkey PRIMARY KEY (id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: emath
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: emath
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: emath
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: emath
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: auth_user_groups_group_id_97559544; Type: INDEX; Schema: public; Owner: emath
--

CREATE INDEX auth_user_groups_group_id_97559544 ON public.auth_user_groups USING btree (group_id);


--
-- Name: auth_user_groups_user_id_6a12ed8b; Type: INDEX; Schema: public; Owner: emath
--

CREATE INDEX auth_user_groups_user_id_6a12ed8b ON public.auth_user_groups USING btree (user_id);


--
-- Name: auth_user_user_permissions_permission_id_1fbb5f2c; Type: INDEX; Schema: public; Owner: emath
--

CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON public.auth_user_user_permissions USING btree (permission_id);


--
-- Name: auth_user_user_permissions_user_id_a95ead1b; Type: INDEX; Schema: public; Owner: emath
--

CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON public.auth_user_user_permissions USING btree (user_id);


--
-- Name: auth_user_username_6821ab7c_like; Type: INDEX; Schema: public; Owner: emath
--

CREATE INDEX auth_user_username_6821ab7c_like ON public.auth_user USING btree (username varchar_pattern_ops);


--
-- Name: database_externallink_parent_e_id_id_6dc28d45; Type: INDEX; Schema: public; Owner: emath
--

CREATE INDEX database_externallink_parent_e_id_id_6dc28d45 ON public.presentation_externallink USING btree (parent_e_id_id);


--
-- Name: database_level_author_level_id_6696cbee; Type: INDEX; Schema: public; Owner: emath
--

CREATE INDEX database_level_author_level_id_6696cbee ON public.presentation_level_author USING btree (level_id);


--
-- Name: database_level_author_person_id_f1eeb474; Type: INDEX; Schema: public; Owner: emath
--

CREATE INDEX database_level_author_person_id_f1eeb474 ON public.presentation_level_author USING btree (person_id);


--
-- Name: database_level_contributor_level_id_7adfbd76; Type: INDEX; Schema: public; Owner: emath
--

CREATE INDEX database_level_contributor_level_id_7adfbd76 ON public.presentation_level_contributor USING btree (level_id);


--
-- Name: database_level_contributor_person_id_0c153aa6; Type: INDEX; Schema: public; Owner: emath
--

CREATE INDEX database_level_contributor_person_id_0c153aa6 ON public.presentation_level_contributor USING btree (person_id);


--
-- Name: database_level_parent_id_fa9da85a; Type: INDEX; Schema: public; Owner: emath
--

CREATE INDEX database_level_parent_id_fa9da85a ON public.presentation_level USING btree (parent_id);


--
-- Name: database_level_tree_id_f21415da; Type: INDEX; Schema: public; Owner: emath
--

CREATE INDEX database_level_tree_id_f21415da ON public.presentation_level USING btree (tree_id);


--
-- Name: database_para_para_parent_id_5e3b29cc; Type: INDEX; Schema: public; Owner: emath
--

CREATE INDEX database_para_para_parent_id_5e3b29cc ON public.presentation_para USING btree (para_parent_id);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: emath
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: emath
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: emath
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: emath
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_group_id_97559544_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_user_id_6a12ed8b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: presentation_externallink database_externallin_parent_e_id_id_6dc28d45_fk_database_; Type: FK CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.presentation_externallink
    ADD CONSTRAINT database_externallin_parent_e_id_id_6dc28d45_fk_database_ FOREIGN KEY (parent_e_id_id) REFERENCES public.presentation_para(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: presentation_level_author database_level_author_level_id_6696cbee_fk_database_level_id; Type: FK CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.presentation_level_author
    ADD CONSTRAINT database_level_author_level_id_6696cbee_fk_database_level_id FOREIGN KEY (level_id) REFERENCES public.presentation_level(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: presentation_level_author database_level_author_person_id_f1eeb474_fk_database_person_id; Type: FK CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.presentation_level_author
    ADD CONSTRAINT database_level_author_person_id_f1eeb474_fk_database_person_id FOREIGN KEY (person_id) REFERENCES public.presentation_person(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: presentation_level_contributor database_level_contr_level_id_7adfbd76_fk_database_; Type: FK CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.presentation_level_contributor
    ADD CONSTRAINT database_level_contr_level_id_7adfbd76_fk_database_ FOREIGN KEY (level_id) REFERENCES public.presentation_level(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: presentation_level_contributor database_level_contr_person_id_0c153aa6_fk_database_; Type: FK CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.presentation_level_contributor
    ADD CONSTRAINT database_level_contr_person_id_0c153aa6_fk_database_ FOREIGN KEY (person_id) REFERENCES public.presentation_person(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: presentation_level database_level_parent_id_fa9da85a_fk_database_level_id; Type: FK CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.presentation_level
    ADD CONSTRAINT database_level_parent_id_fa9da85a_fk_database_level_id FOREIGN KEY (parent_id) REFERENCES public.presentation_level(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: presentation_para database_para_para_parent_id_5e3b29cc_fk_database_level_id; Type: FK CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.presentation_para
    ADD CONSTRAINT database_para_para_parent_id_5e3b29cc_fk_database_level_id FOREIGN KEY (para_parent_id) REFERENCES public.presentation_level(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: emath
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

