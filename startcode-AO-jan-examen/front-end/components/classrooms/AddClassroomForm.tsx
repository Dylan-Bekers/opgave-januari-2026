import ClassroomService from "@services/ClassroomService";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { StatusMessage } from "@types";

const AddClassroomForm: React.FC = () => {
    // i18n via next-i18next (vraag c)
    const { t } = useTranslation();

    const [name, setName] = useState<string>("");
    const [statusMessage, setStatusMessage] = useState<StatusMessage>(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage(null);

        // empty form validation with translatable error (vraag d)
        if (!name.trim()) {
            setStatusMessage({ type: "error", message: t("classroom.emptyError") });
            return;
        }

        try {
            // POST to back-end endpoint /classrooms (vraag e)
            const created = await ClassroomService.createClassroom(name.trim());
            setStatusMessage({ type: "success", message: t("classroom.success", { id: created.id, name: created.name }) });
            setName(""); // clear on success (vraag f)
        } catch (err: any) {
            if (err.message === "CLASSROOM_EXISTS") {
                setStatusMessage({ type: "error", message: t("classroom.existsError") }); //keep input on duplicate (vraag g)
                return;
            }
            setStatusMessage({ type: "error", message: 'Error' });
        }
    };

    return (
        <div className="mt-5 w-full max-w-md">
            {statusMessage && (
                <p className={statusMessage.type === 'success' ? 'text-green-500' : 'text-red-500'}>
                {statusMessage.message}
                </p>
            )}

            <form onSubmit={handleSubmit} className="mt-3">
                <label className="block mb-2">{t('classroom.nameLabel')}</label>
                <input
                    className="border p-2 w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button className="mt-3 px-4 py-2 border" type="submit">
                    {t('classroom.submit')}
                </button>
            </form>
        </div>
    );
};

export default AddClassroomForm;