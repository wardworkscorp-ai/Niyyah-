import React,{useState}from'react';
import{SafeAreaView,View,Text,Pressable,ScrollView,StyleSheet,TextInput,useColorScheme,StatusBar}from'react-native';
const ICONS={
  'person-circle-outline':'●','heart-outline':'♡','sparkles-outline':'✦','leaf-outline':'◌',
  'moon-outline':'☾','book-outline':'▤','barbell-outline':'↔','checkmark':'✓',
  'checkmark-circle':'✓','ellipse-outline':'○','calculator-outline':'#',
  'notifications-outline':'◉','language-outline':'文','lock-closed-outline':'◆',
  'contrast-outline':'◐','chevron-forward':'›','home-outline':'⌂',
  'checkmark-done-outline':'✓','timer-outline':'◷','journal-outline':'▤'
};
function Ionicons({name,size=20,color}){return <Text style={{fontSize:size,color,lineHeight:size+3}}>{ICONS[name]||'•'}</Text>}

const themes={
 light:{bg:'#F6F4EE',card:'#FFFFFF',ink:'#13251C',muted:'#6F776F',line:'#E5E7E2',green:'#1F6B4A',soft:'#DCEBE3'},
 dark:{bg:'#101713',card:'#17201B',ink:'#F4F5F1',muted:'#A8B0AA',line:'#2C3731',green:'#7FC09B',soft:'#21372A'}
};
const seedTasks=[
 {id:1,title:'Finish project brief',pillar:'Ihsan',done:false},
 {id:2,title:'Read Qur’an for 15 minutes',pillar:'Istiqamah',done:true},
 {id:3,title:'Call parents',pillar:'Ikhlas',done:false}
];
const seedHabits=[
 {id:1,title:'Pray on time',done:true},{id:2,title:'Qur’an · 15 min',done:true},
 {id:3,title:'Morning reflection',done:false},{id:4,title:'Exercise',done:false}
];

export default function App(){
 const C=themes[useColorScheme()==='dark'?'dark':'light'];
 const[ready,setReady]=useState(false);
 const[tab,setTab]=useState('Today');
 const[tasks,setTasks]=useState(seedTasks);
 const[habits,setHabits]=useState(seedHabits);
 const[intent,setIntent]=useState('Seek benefit and work with sincerity.');
 if(!ready)return <Onboarding C={C} done={()=>setReady(true)}/>;
 const props={C,tasks,setTasks,habits,setHabits,intent,setIntent};
 return <SafeAreaView style={[s.safe,{backgroundColor:C.bg}]}>
  <StatusBar barStyle={C===themes.dark?'light-content':'dark-content'}/>
  <View style={s.head}><View><Text style={[s.logo,{color:C.ink}]}>Niyyah</Text><Text style={{color:C.muted}}>Ikhlas · Ihsan · Istiqamah</Text></View><Ionicons name="moon-outline" size={26} color={C.green}/></View>
  <View style={s.body}>{tab==='Today'?<Today {...props} setTab={setTab}/>:tab==='Tasks'?<Tasks {...props}/>:tab==='Habits'?<Habits {...props}/>:tab==='Focus'?<Focus C={C}/>:<Reflect {...props}/>}</View>
  <View style={[s.nav,{backgroundColor:C.card,borderColor:C.line}]}>{[['Today','home-outline'],['Tasks','checkmark-done-outline'],['Habits','leaf-outline'],['Focus','timer-outline'],['Reflect','journal-outline']].map(([x,i])=><Pressable key={x} style={s.navItem} onPress={()=>setTab(x)}><Ionicons name={i} size={21} color={tab===x?C.green:C.muted}/><Text style={{fontSize:10,color:tab===x?C.green:C.muted}}>{x}</Text></Pressable>)}</View>
 </SafeAreaView>
}
function Onboarding({C,done}){
 const[step,setStep]=useState(0);
 const pages=[['heart-outline','Begin with intention','Connect meaningful work to sincere intention.'],['sparkles-outline','Work with Ihsan','Give important work your best presence.'],['leaf-outline','Build Istiqamah','Choose consistency over perfection.'],['moon-outline','Let salah shape the day','Plan, pause, reset, and reflect.']];
 const p=pages[step];
 return <SafeAreaView style={[s.safe,s.center,{backgroundColor:C.bg}]}>
  <View style={[s.bubble,{backgroundColor:C.soft}]}><Ionicons name={p[0]} size={42} color={C.green}/></View>
  <Text style={[s.onTitle,{color:C.ink}]}>{p[1]}</Text><Text style={[s.onBody,{color:C.muted}]}>{p[2]}</Text>
  <View style={s.dots}>{pages.map((_,i)=><View key={i} style={[s.dot,{backgroundColor:i===step?C.green:C.line}]}/>)}</View>
  <Pressable style={[s.button,{backgroundColor:C.green}]} onPress={()=>step===3?done():setStep(step+1)}><Text style={s.buttonText}>{step===3?'Enter Niyyah':'Continue'}</Text></Pressable>
 </SafeAreaView>
}
function Title({C,children}){return <Text style={[s.title,{color:C.ink}]}>{children}</Text>}
function Card({C,children}){return <View style={[s.card,{backgroundColor:C.card,borderColor:C.line}]}>{children}</View>}
function Today({C,tasks,habits,intent,setTab}){
 const done=[...tasks,...habits].filter(x=>x.done).length,total=tasks.length+habits.length,pct=Math.round(done/total*100);
 return <ScrollView contentContainerStyle={s.scroll}>
  <View style={[s.hero,{backgroundColor:C.green}]}><Text style={s.eyebrow}>TODAY’S INTENTION</Text><Text style={s.heroTitle}>{intent}</Text><Text style={s.heroSub}>Progress is a means, not a measure of your worth.</Text></View>
  <Title C={C}>Your three pillars</Title><View style={s.pillars}>{[['Ikhlas','Remember why.'],['Ihsan','Do it well.'],['Istiqamah','Keep returning.']].map(x=><Card C={C} key={x[0]}><Text style={[s.pillar,{color:C.green}]}>{x[0]}</Text><Text style={{color:C.muted}}>{x[1]}</Text></Card>)}</View>
  <Card C={C}><View style={s.between}><Text style={[s.cardTitle,{color:C.ink}]}>Today’s balance</Text><Text style={[s.stat,{color:C.green}]}>{pct}%</Text></View><View style={[s.track,{backgroundColor:C.line}]}><View style={{width:pct+'%',height:'100%',backgroundColor:C.green}}/></View><Text style={{color:C.muted}}>{done} of {total} actions complete</Text></Card>
  <View style={s.between}><Title C={C}>Next actions</Title><Pressable onPress={()=>setTab('Tasks')}><Text style={{color:C.green}}>View all</Text></Pressable></View>
  <Card C={C}>{tasks.map(t=><View key={t.id} style={s.row}><Ionicons name={t.done?'checkmark-circle':'ellipse-outline'} size={23} color={t.done?C.green:C.muted}/><View style={{flex:1}}><Text style={{color:C.ink,fontWeight:'700'}}>{t.title}</Text><Text style={{color:C.muted,fontSize:12}}>{t.pillar}</Text></View></View>)}</Card>
 </ScrollView>
}
function Tasks({C,tasks,setTasks}){
 const[value,setValue]=useState('');const add=()=>{if(value.trim()){setTasks([...tasks,{id:Date.now(),title:value.trim(),pillar:'Ihsan',done:false}]);setValue('')}};
 return <ScrollView contentContainerStyle={s.scroll}><Title C={C}>Tasks</Title><Card C={C}><TextInput value={value} onChangeText={setValue} placeholder="Add a meaningful task…" placeholderTextColor={C.muted} style={[s.input,{color:C.ink,borderColor:C.line}]}/><Pressable style={[s.button,{backgroundColor:C.green}]} onPress={add}><Text style={s.buttonText}>Add task</Text></Pressable></Card><Card C={C}>{tasks.map(t=><Pressable key={t.id} style={s.row} onPress={()=>setTasks(tasks.map(x=>x.id===t.id?{...x,done:!x.done}:x))}><Ionicons name={t.done?'checkmark-circle':'ellipse-outline'} size={25} color={t.done?C.green:C.muted}/><Text style={{color:C.ink,flex:1,fontWeight:'700'}}>{t.title}</Text><Text style={{color:C.green,fontSize:12}}>{t.pillar}</Text></Pressable>)}</Card></ScrollView>
}
function Habits({C,habits,setHabits}){
 return <ScrollView contentContainerStyle={s.scroll}><Title C={C}>Habits</Title><Card C={C}>{habits.map(h=><Pressable key={h.id} style={s.row} onPress={()=>setHabits(habits.map(x=>x.id===h.id?{...x,done:!x.done}:x))}><Ionicons name="leaf-outline" size={22} color={C.green}/><Text style={{color:C.ink,flex:1,fontWeight:'700'}}>{h.title}</Text><Ionicons name={h.done?'checkmark-circle':'ellipse-outline'} size={25} color={h.done?C.green:C.muted}/></Pressable>)}</Card><Card C={C}><Text style={[s.cardTitle,{color:C.ink}]}>Consistency, not perfection</Text><Text style={{color:C.muted,lineHeight:21,marginTop:8}}>Missing a day does not erase your path. Begin again with the next good action.</Text></Card></ScrollView>
}
function Focus({C}){
 const[min,setMin]=useState(25),[run,setRun]=useState(false);
 return <ScrollView contentContainerStyle={s.scroll}><Title C={C}>Ihsan Focus</Title><Card C={C}><View style={s.center}><View style={[s.bubble,{backgroundColor:C.soft}]}><Ionicons name="sparkles-outline" size={34} color={C.green}/></View><Text style={[s.focus,{color:C.ink}]}>{min}:00</Text><Text style={{color:C.muted,textAlign:'center'}}>One task. Full attention.</Text><View style={s.dots}>{[15,25,45].map(x=><Pressable key={x} onPress={()=>setMin(x)} style={[s.chip,{backgroundColor:min===x?C.soft:C.bg}]}><Text style={{color:C.green}}>{x} min</Text></Pressable>)}</View><Pressable style={[s.button,{backgroundColor:C.green}]} onPress={()=>setRun(!run)}><Text style={s.buttonText}>{run?'Pause focus':'Start focus'}</Text></Pressable></View></Card></ScrollView>
}
function Reflect({C,intent,setIntent}){
 const[draft,setDraft]=useState(intent);
 return <ScrollView contentContainerStyle={s.scroll}><Title C={C}>Reflect</Title><Card C={C}><Text style={[s.cardTitle,{color:C.ink}]}>Renew your intention</Text><TextInput multiline value={draft} onChangeText={setDraft} style={[s.input,s.area,{color:C.ink,borderColor:C.line}]}/><Pressable style={[s.button,{backgroundColor:C.green}]} onPress={()=>setIntent(draft)}><Text style={s.buttonText}>Save intention</Text></Pressable></Card>{['Did my actions align with my intention?','Where did I give my best effort?','What should I continue next week?'].map(q=><Card C={C} key={q}><Text style={{color:C.ink,fontWeight:'700'}}>{q}</Text><TextInput multiline placeholder="Write a private note…" placeholderTextColor={C.muted} style={[s.input,s.area,{color:C.ink,borderColor:C.line}]}/></Card>)}</ScrollView>
}
const s=StyleSheet.create({
 safe:{flex:1},body:{flex:1},head:{padding:18,flexDirection:'row',justifyContent:'space-between',alignItems:'center'},logo:{fontSize:27,fontWeight:'900'},
 scroll:{padding:18,paddingBottom:105,gap:14},hero:{padding:22,borderRadius:25},eyebrow:{color:'white',fontSize:11,letterSpacing:1.4},heroTitle:{color:'white',fontSize:24,lineHeight:31,fontWeight:'800',marginTop:8},heroSub:{color:'white',opacity:.8,marginTop:8},
 title:{fontSize:20,fontWeight:'800'},card:{padding:16,borderWidth:1,borderRadius:20},cardTitle:{fontSize:16,fontWeight:'800'},pillars:{flexDirection:'row',gap:8},pillar:{fontWeight:'800',marginBottom:5},between:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},stat:{fontSize:27,fontWeight:'900'},track:{height:9,borderRadius:9,overflow:'hidden',marginVertical:12},
 row:{flexDirection:'row',alignItems:'center',gap:11,paddingVertical:12},input:{borderWidth:1,borderRadius:13,padding:12,marginBottom:10},area:{minHeight:90,textAlignVertical:'top',marginTop:10},button:{padding:14,borderRadius:14,alignItems:'center',minWidth:190},buttonText:{color:'white',fontWeight:'800'},
 nav:{height:78,borderTopWidth:1,flexDirection:'row',justifyContent:'space-around',alignItems:'center',paddingBottom:8},navItem:{alignItems:'center',gap:3},center:{alignItems:'center',justifyContent:'center',padding:24},bubble:{width:84,height:84,borderRadius:28,alignItems:'center',justifyContent:'center'},
 onTitle:{fontSize:30,fontWeight:'900',textAlign:'center',marginTop:28},onBody:{fontSize:16,lineHeight:24,textAlign:'center',marginTop:12},dots:{flexDirection:'row',gap:8,marginVertical:25},dot:{width:8,height:8,borderRadius:8},focus:{fontSize:52,fontWeight:'900',marginVertical:15},chip:{padding:10,borderRadius:12}
});
