import { GroupItemProps } from '@aomao/toolbar-vue'

// export const defaultContent = `<h2 data-id="h2666-1" style="text-align: center;">杂谈小记</h2><p><br /></p><h3 data-id="h3666-1" style="text-align: center;">一、复杂的酒意</h3><p data-id="p6666-a001" style="text-indent: 2em;">酒，从来都是一个<strong>复杂</strong>的意象。
// 是推杯换盏，是酩酊大醉，是得意时看遍长安花，是失意时<span style="color: rgb(255, 77, 79);">心雨倾盆下</span>。买醉与痛苦，眼泪与酒精齐飞。</p><p><br /></p>
// <h3 data-id="h3666-2" style="text-align: center;">二、微醺系列</h3><p contenteditable="false" data-id="p6666-a002" style="text-indent: 2em;">RIO的微醺系列，在产品定位上，就剔除了这种纯粹痛与乐的情绪，选择了介于清醒与迷乱之间的微醺。
// 创意以<span style="background-color: rgb(250, 219, 20);">少女的暗恋</span>来定位这种朦胧美好，纠结苦涩的情绪。</p>

// <h4>2.1、微醺系列一</h4><p style="text-indent: 2em;">rio鸡尾酒微醺系列有五款，包括白桃、葡萄、乳酸菌、柠檬、西柚五种口味，其主打一人饮酒，属于一人的微醺时光，五种口味可以让你一周的小酒时光充满新鲜的感觉，陪伴你每个小情绪，不论你是什么样的心情：开心的、纠结的、无聊的、甜蜜的、兴奋的还是其他，都能够在RIO微醺淡淡酒精的作用下得到一种释放，感受到一种愉悦和放松。</p>
// <h4>2.2、微醺系列二</h4><p style="text-indent: 2em;">RIO微醺，以浓郁的果味、独特的乳酸菌口味与朗姆、白兰地、伏特加相碰撞，令人印象深刻，打开一罐RIO微醺，淡淡的香气溢出，轻轻抿一口，微微的气泡与酒意，让人觉得舒缓放松，为独处时光增加了一抹色彩。凭此RIO微醺已经俘获了不少消费者的喜爱，很多消费者纷纷在微博、抖音、小红书等平台晒图安利，表达自己对RIO微醺的喜爱，特别是乳酸菌口味和白桃口味的RIO微醺，俨然一种网红爆款的趋势。</p>
// <h4>2,3、微醺系列三</h4><p style="text-indent: 2em;">锐澳微醺系列酒度数在3度，以浓郁的果味、独特的乳酸菌口味与朗姆、白兰地、伏特加相碰撞，令人印象深刻，打开一罐RIO微醺，淡淡的香气溢出，轻轻抿一口，微微的气泡与酒意，让人觉得舒缓放松，为独处时光增加了一抹色彩。</p>
// <h4>2.4、微醺系列四</h4><p style="text-indent: 2em;">每一款口味都是以不同种类的水果为主，无论是从包装还是口感，都各有特色，不论是你开心纠结无聊还是甜蜜时，都可以选择任意一款进行，平常能够得到一种精神的释放，感受到了一种愉悦和放松感。浓郁的果香味道，独特的乳酸菌，再加上一定的洋酒相互碰撞，擦出了热烈的火花，令人印象极其深刻，打开一罐锐澳微醺，有淡淡的香气，铺满整个鼻腔，轻轻抿一口，让人更加觉得舒缓放松。</p>
// <h4>2.4、微醺系列五</h4><p style="text-indent: 2em;">德国葡萄酒品质优异，素以甜白葡萄酒著称，在很长一段时间里，德国的甜白葡萄酒可以说是称冠全球。如今，德国的葡萄酒中有70%是白葡萄酒，其中甜白葡萄酒和不甜白葡萄酒各占半壁江山。德国红葡萄酒虽然产量较少，但近年来其品质也出现了可喜的上升趋势。</p>
// <h4>2.5、微醺系列六</h4><p>德国是全世界最北的葡萄酒产区（北纬47至55度），已经到达了栽培葡萄的纬度极限。大西洋的墨西哥湾暖流最北只能到达德国，使德国的平均气温不会低于9℃，而低于这个温度的话，葡萄酒无法生长了。此外，德国的葡萄园多位于莱茵河畔，秋季河水中升起的浓雾对葡萄树起到保暖的作用。</p>
// <p style="text-indent: 2em;">德国的日照时间比较短，这就使得当地的葡萄成熟时间要比其他地方长一个月左右。较长的成熟时间使葡萄可以充分吸收土壤中的矿物质。另外，在缓慢的成熟过程中，葡萄果实中也会发展出更多的酸味。正是因为纬度、洋流和日照等原因的综合作用，才造就了德国葡萄酒迷人的酸味和独特的香气。</p>

// <h3 data-id="h3666-3" style="text-align: center;">三、凡尔赛文学</h3><p data-id="p6666-a003" style="text-indent: 2em;">所谓“凡尔赛文学”，一句话概括就是不经意间地炫耀出优越感。用主持人何炅的话说就是“用最低调的话，炫最高调的耀。”</p>
// <p data-id="p6666-a004" style="text-indent: 2em;">带你真正了解凡尔赛，实际上，凡尔赛（Versailles）原指法国贵族宫殿，也就是凡尔赛宫，它是巴黎著名的宫殿之一，也是世界五大宫殿之一，1979年被列为《世界文化遗产名录》。</p>
// <p data-id="p6666-a005" style="text-indent: 2em;">凡尔赛是法国巴黎的卫星城以及伊夫林省省会，曾是法兰西王朝的行政中心。位于巴黎西南15千米处，为一座艺术城市。</p><p><br /></p>
// <h3 data-id="h3666-4" style="text-align: center;">四、恋爱物语</h3><p data-id="p6666-a006" style="text-indent: 2em;">文案从来不只是文字，画面更为文案添彩。微醺的恋爱物语，都在这几张海报里了。</p>`

export const getDefaultStyle = () => ({
  height: '100%',
  width: '700px',
  margin: '70px 0 35px 0',
  padding: '0',
  background: '#fff',
  border: '1px solid #f0f0f0',
  overflowY: 'auto',
  boxShadow: 'rgba(158, 161, 165, 0.4) 0px 2px 12px 0px',
  minHeight: 'calc(100vh - 36px)',
  fontFamily: 'SimSun, 宋体, "Songti SC", NSimSun, STSong, serif'
})

export const defaultPCToolbarItems: GroupItemProps[] = [
  ['collapse'],
  ['undo', 'redo', 'paintformat', 'removeformat'],
  ['heading', 'fontfamily', 'fontsize'],
  ['bold', 'italic', 'strikethrough', 'underline', 'moremark'],
  ['fontcolor', 'backcolor'],
  ['alignment'],
  ['unorderedlist', 'orderedlist', 'tasklist', 'indent', 'line-height'],
  ['link', 'quote', 'hr']
]

export const defaultMobileToolbarItems: GroupItemProps[] = [
  ['undo', 'redo'],
  {
    icon: 'text',
    items: ['bold', 'italic', 'strikethrough', 'underline', 'moremark']
  },
  [
    {
      type: 'button',
      name: 'image-uploader',
      icon: 'image'
    },
    'link',
    'tasklist',
    'heading'
  ],
  {
    icon: 'more',
    items: [
      {
        type: 'button',
        name: 'video-uploader',
        icon: 'video'
      },
      {
        type: 'button',
        name: 'file-uploader',
        icon: 'attachment'
      },
      {
        type: 'button',
        name: 'table',
        icon: 'table'
      },
      {
        type: 'button',
        name: 'math',
        icon: 'math'
      },
      {
        type: 'button',
        name: 'codeblock',
        icon: 'codeblock'
      },
      {
        type: 'button',
        name: 'orderedlist',
        icon: 'orderedlist'
      },
      {
        type: 'button',
        name: 'unorderedlist',
        icon: 'unorderedlist'
      },
      {
        type: 'button',
        name: 'hr',
        icon: 'hr'
      }
    ]
  }
]

export const getDefaultToolbarItems = (isMobile: boolean): GroupItemProps[] => {
  return isMobile ? [...defaultMobileToolbarItems] : [...defaultPCToolbarItems]
}
