/**
 * 复制到剪切板
 * @param text 文本内容
 */
export const copy = (text: string) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  document.body.appendChild(textarea);
  textarea.select();

  try {
    const success = document.execCommand('copy');
    if (success) {
      (window as any as any).$message.success('复制成功！');
    } else {
      (window as any).$message.success('复制失败！');
    }
  } catch (err: any) {
    (window as any).$message.success('复制失败！请手动复制');
  } finally {
    document.body.removeChild(textarea);
  }
};
