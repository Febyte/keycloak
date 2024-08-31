import CodeEditor from "../../components/CodeEditor";
import { json } from "@codemirror/lang-json";
import { ActionGroup, Button, Form, PageSection } from "@patternfly/react-core";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAlerts } from "@keycloak/keycloak-ui-shared";
import { prettyPrintJSON } from "../../util";
import { useUserProfile } from "./UserProfileContext";

export const JsonEditorTab = () => {
  const { config, save, isSaving } = useUserProfile();
  const { t } = useTranslation();
  const { addError } = useAlerts();
  const [editor, setEditor] = useState<string>();

  const resetCode = useCallback(() => {
    setEditor(config ? prettyPrintJSON(config) : "");
  }, [config]);

  useEffect(() => resetCode(), [resetCode]);

  async function handleSave() {
    if (!editor) {
      return;
    }

    try {
      await save(JSON.parse(editor));
    } catch (error) {
      addError("invalidJsonError", error);
    }
  }

  return (
    <PageSection variant="light">
      <CodeEditor
        language={json()}
        height="30rem"
        code={editor}
        onChange={setEditor}
      />
      <Form>
        <ActionGroup>
          <Button
            data-testid="save"
            variant="primary"
            onClick={handleSave}
            isDisabled={isSaving}
          >
            {t("save")}
          </Button>
          <Button variant="link" onClick={resetCode} isDisabled={isSaving}>
            {t("revert")}
          </Button>
        </ActionGroup>
      </Form>
    </PageSection>
  );
};
