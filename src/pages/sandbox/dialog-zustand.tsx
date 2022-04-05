/* eslint-disable no-console */
import * as React from 'react';

import useDialog from '@/hooks/useDialog';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import useDialogStore from '@/store/useDialogStore';

export default function UseDialogPage() {
  const open = useDialogStore.useOpen();

  const dialog = useDialog();
  const [status, setStatus] = React.useState<string>(
    'Click one of the dialog!'
  );
  console.log('status:', status);

  // function openDanger() {
  //   setStatus('Danger Dialog Opened');
  //   dialog({
  //     title: 'Danger!',
  //     description: (
  //       <>
  //         This is a <strong className='text-red-600'>danger dialog</strong>.
  //       </>
  //     ),
  //     catchOnCancel: true,
  //     submitText: 'OH YES',
  //     variant: 'danger',
  //   })
  //     .then(() => setStatus('Danger Dialog: Submitted'))
  //     .catch(() => setStatus('Danger Dialog: Rejected'));
  // }

  // function openWarning() {
  //   setStatus('Warning Dialog Opened');
  //   dialog({
  //     title: 'Warning!',
  //     description: (
  //       <>
  //         This is a <strong className='text-yellow-600'>warning dialog</strong>.
  //       </>
  //     ),
  //     catchOnCancel: true,
  //     submitText: 'Okay',
  //     variant: 'warning',
  //   })
  //     .then(() => setStatus('Warning Dialog: Submitted'))
  //     .catch(() => setStatus('Warning Dialog: Rejected'));
  // }

  // function openSuccess() {
  //   setStatus("Success Dialog Opened (this one don't catch reject)");
  //   dialog({
  //     title: 'Success!',
  //     description: (
  //       <>
  //         This is a <strong className='text-green-600'>success dialog</strong>.
  //       </>
  //     ),
  //     // Can be omitted
  //     catchOnCancel: false,
  //     submitText: 'Cool',
  //     variant: 'success',
  //   }).then(() => setStatus('Success Dialog: Submitted'));
  // }

  const openSuccess = () => {
    dialog({
      title: 'Success title',
      description: 'Success description whatever you want',
      submitText: 'Hurray',
      variant: 'success',
      catchOnCancel: true,
    })
      .then(() => console.log('accept'))
      .catch(() => console.log('reject'));
  };
  const openWarning = () => {
    dialog({
      title: 'Warning title !!!',
      description: 'Warning description whatever you want',
      submitText: 'Sure',
      variant: 'warning',
      catchOnCancel: true,
    })
      .then(() => console.log('accept'))
      .catch(() => console.log('reject'));
  };
  const openDanger = () => {
    dialog({
      title: "Danger action! Don't do it",
      description: 'Danger description, are you sure?',
      submitText: 'Do it',
      variant: 'danger',
      catchOnCancel: true,
    })
      .then(() => console.log('accept'))
      .catch(() => console.log('reject'));
  };

  return (
    <Layout>
      <Seo templateTitle='useDialog' />

      <section className='bg-gray-100'>
        <div className='layout flex min-h-screen flex-col items-start space-y-3 py-20'>
          <Button onClick={openSuccess}>Success Alert</Button>
          <Button onClick={openWarning}>Warning Alert</Button>
          <Button onClick={openDanger}>Danger Alert</Button>
        </div>
      </section>
    </Layout>
  );
}
