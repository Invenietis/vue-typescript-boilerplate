Vue.use(VueRouter);
import one from './components/partone/partone';
import two from './components/parttwo/parttwo';

var router = new VueRouter({
    history: true,
});
router.map({
    'partone': {
        name: 'one',
        component:one
        
    },
    'parttwo':{
        name: 'two',
        component:two
    }
});
export default router;