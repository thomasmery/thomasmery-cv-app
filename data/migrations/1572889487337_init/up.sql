CREATE TABLE public.pages (
    id integer NOT NULL,
    title text NOT NULL
);
CREATE SEQUENCE public.page_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.page_id_seq OWNED BY public.pages.id;
ALTER TABLE ONLY public.pages ALTER COLUMN id SET DEFAULT nextval('public.page_id_seq'::regclass);
ALTER TABLE ONLY public.pages
    ADD CONSTRAINT page_pkey PRIMARY KEY (id);
