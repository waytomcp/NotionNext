import { useGlobal } from '@/lib/global'

/**
 * 字数统计
 * @returns
 */
export default function WordCount({ wordCount, readTime }) {
  const { locale } = useGlobal()
  return (
    <span id='wordCountWrapper' className='flex gap-3'>
      <span className='flex whitespace-nowrap items-center'>
        <span>{locale.COMMON.WORD_COUNT}</span>&nbsp;
        <span id='wordCount'>{wordCount}</span>
      </span>
      <span className='flex whitespace-nowrap items-center'>
        <span>{locale.COMMON.READ_TIME}</span>&nbsp;
        <span id='readTime'>{readTime}</span>&nbsp;{locale.COMMON.MINUTE}
      </span>
    </span>
  )
}