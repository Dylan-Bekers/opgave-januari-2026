import Header from "@components/header";
import AddClassroomForm from "@components/classrooms/AddClassroomForm";
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { User } from "@types";

const ClassroomPage: React.FC = () => {
    const { t } = useTranslation();
    const [loggedInUser, setLoggedInUser] = useState<User>(null);

    useEffect(() => {
        setLoggedInUser(JSON.parse(sessionStorage.getItem('loggedInUser') as string));
    }, []);

    const isAdmin = loggedInUser?.role === 'admin';

    return (
        <>
            <Head>
                <title>{t('classroom.title')}</title>
            </Head>
            <Header />
            <main className="p-6 min-h-screen flex flex-col items-center">
                <h1>{t('classroom.title')}</h1>

                {/* show error when not logged in as admin (vraag b) */}
                {!isAdmin && <p className="mt-5 text-red-500">{t('classroom.notAdmin')}</p>}

                {isAdmin && <AddClassroomForm />}
            </main>
        </>
    );
};

export const getServerSideProps = async (context) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
};

export default ClassroomPage;