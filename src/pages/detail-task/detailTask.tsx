import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  IStackStyles,
  IStackTokens,
  Label,
  PrimaryButton,
  Stack,
  Text,
} from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Header, Loading, TagLabel } from '../../components';
import { formatDateString, titleCase } from '../../helper';
import { taskService } from '../../service';
import { lang } from '../../utils';

const detailStackToken: IStackTokens = {
  childrenGap: 55,
};

const itemStackToken: IStackTokens = {
  childrenGap: 25,
};

const buttonStackToken: IStackTokens = {
  childrenGap: 5,
};

const buttonStackStyle: IStackStyles = {
  root: {
    paddingTop: 15,
    justifyContent: 'end',
  },
};

const dialogContentProps = {
  type: DialogType.normal,
  title: lang('dialog.delete_task'),
  subText: lang('dialog.delete_task_description'),
};

const DetailTask = () => {
  const { taskID } = useParams<{ taskID: string }>();
  const navigate = useNavigate();
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const style: React.CSSProperties = {
    margin: '0px 15px',
    width: '100%',
  };
  const { response, loading, request } = taskService.getTasksByID(taskID as string);

  const onEditClick = () => {
    navigate(`/task/${taskID}/edit`);
  };

  const onDeleteClick = () => {
    console.log(`delete task ${taskID}`);
    navigate('/');
  };

  useEffect(() => {
    request();
  }, []);

  return (
    <div style={style}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header
            title={lang('detail_task.header', {
              task_name: titleCase(response?.data.title || ''),
            })}
          />

          <Stack horizontal tokens={detailStackToken} horizontalAlign="space-between">
            <Stack tokens={itemStackToken} style={{ width: '50%' }}>
              <Stack.Item>
                <Label>{lang('detail_task.description')}</Label>
                <Text>{response?.data.description || ''}</Text>
              </Stack.Item>
              <Stack.Item>
                <Label>{lang('detail_task.due_date')}</Label>
                <Text>
                  {formatDateString(response?.data.due_date, 'MMMM D, YYYY • HH:mm')}
                </Text>
              </Stack.Item>
              <Stack.Item>
                <Label>{lang('detail_task.tags')}</Label>
                <div>
                  {response?.data.tags.map((tag: string, index: number) => {
                    return <TagLabel tag={tag} key={index} />;
                  })}
                </div>
              </Stack.Item>
            </Stack>

            <Stack tokens={itemStackToken} style={{ width: '50%' }}>
              <Stack.Item>
                <Label>{lang('detail_task.priority')}</Label>
                <Text>{titleCase(response?.data.priority || '')}</Text>
              </Stack.Item>
              <Stack.Item>
                <Label>{lang('detail_task.state')}</Label>
                <Text>{titleCase(response?.data.status || '')}</Text>
              </Stack.Item>
            </Stack>
          </Stack>

          <Stack horizontal tokens={buttonStackToken} styles={buttonStackStyle}>
            <DefaultButton onClick={toggleHideDialog}>
              {lang('button.delete')}
            </DefaultButton>
            <PrimaryButton onClick={onEditClick}>{lang('button.edit')}</PrimaryButton>
          </Stack>
        </>
      )}

      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
      >
        <DialogFooter>
          <PrimaryButton onClick={toggleHideDialog}>
            {lang('button.cancel')}
          </PrimaryButton>
          <DefaultButton onClick={onDeleteClick}>{lang('button.delete')}</DefaultButton>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default DetailTask;
