var Product = require('../models/product');

var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
mongoose.connect('localhost:27017/tailor');

var products = [
    new Product({
       imagePath: 'http://images.tedbakerimages.com/us%2FMens%2FClothing%2FSuits%2FMETALLJ-Debonair-wool-suit-jacket-Dark-Blue%2FTS6M_METALLJ_12-DARK-BLUE_1.jpg.jpg?o=To6o6gSDiGco72yU6VAsQ1DwABEj&V=Wq5e&',
       title: 'Suit',
       description: 'The silhouette of a suit is its outline. Tailored balance created from a canvas fitting allows a balanced silhouette so a jacket need not be buttoned and a garment is not too tight or too loose. A proper garment is shaped from the neck to the chest and shoulders to drape without wrinkles from tension. Shape is the essential part of tailoring that often takes hand work from the start. The two main cuts are double-breasted suits, a conservative design with two columns of buttons, spanned by a large overlap of the left and right sides; and single-breasted suits, in which the sides overlap very slightly, with a single column of buttons. Good tailoring anywhere in the world is characterised by strongly tapered sides and minimal shoulder, whereas often rack suits are padded to reduce labour. More casual suits are characterised by less construction and tailoring, much like the sack suit is a loose American style!!',
       price: 100,
       categoryId: '3'
    }),
    
    new Product({
       imagePath: 'https://cdn1.tailorstore.com/pages/mens-shirt/made-to-measure-shirt-ternberg.jpg',
       title: 'Shirt',
       description: 'The shirt was an item of clothing that only men could wear as underwear, until the twentieth century.[2] Although the womans chemise was a closely related garment to the mans, it is the mans garment that became the modern shirt.[3] In the Middle Ages, it was a plain, undyed garment worn next to the skin and under regular garments. In medieval artworks, the shirt is only visible (uncovered) on humble characters, such as shepherds, prisoners, and penitents.[4] In the seventeenth century, mens shirts were allowed to show, with much the same erotic import as visible underwear today.[5] In the eighteenth century, instead of underpants, men "relied on the long tails of shirts ... to serve the function of drawers.[6] Eighteenth-century costume historian Joseph Strutt believed that men who did not wear shirts to bed were indecent.[7] Even as late as 1879, a visible shirt with nothing over it was considered improper.[2]',
       price: 40,
        categoryId: '1'
    }),
    
    new Product({
       imagePath: 'http://static3.businessinsider.com/image/51225e27eab8ea4506000001-480/hall-and-madden-mens-dress-shirt-and-tie.png',
       title: 'Custom Shirt',
       description: 'The first documented appearance of the expression “To give the shirt off one’s back,” happened in 1771 as an idiom that indicates extreme desperation or generosity and is still in common usage. In 1827 Hannah Montague, a housewife in upstate New York, invents the detachable collar. Tired of constantly washing her husband’s entire shirt when only the collar needed it, she cut off his collars and devised a way of attaching them to the neckband after washing. It wasnt until the 1930s that collar stays became popular, although these early accessories resembled tie clips more than the small collar stiffeners available today. They connected the collar points to the necktie, keeping them in place',
       price: 50,
        categoryId: '1'
    }),
    
    new Product({
       imagePath: 'https://ae01.alicdn.com/kf/HTB1HwVCLVXXXXXcXXXXq6xXFXXXi/Long-Sleeve-Clothes-New-Trend-Mens-font-b-Tailored-b-font-font-b-Dress-b-font.jpg',
       title: 'White Shirt',
       description: 'Whitey White!!',
       price: 10,
        categoryId:'1'
    }),
    
    new Product({
        imagePath: 'https://suitstailored.files.wordpress.com/2013/03/6.jpg',
        title: 'Designer Suit',
        description: 'Suits are made in a variety of fabrics, but most commonly from wool. The two main yarns produce worsteds (where the fibres are combed before spinning to produce a smooth, hard wearing cloth) and woollens (where they are not, thus remaining comparatively fluffy in texture). These can be woven in a number of ways producing flannel, tweed, gabardine, and fresco among others. These fabrics all have different weights and feel, and some fabrics have an S (or Super S) number describing the fineness of the fibres measured by average fibre diameter, e.g., Super 120; however, the finer the fabric, the more delicate and thus less likely to be long-wearing it will be. Although wool has traditionally been associated with warm, bulky clothing meant for warding off cold weather, advances in making finer and finer fibre have made wool suits acceptable for warmer weather, as fabrics have accordingly become lighter and more supple. Wool fabric is denominated by the weight of a one-square yard piece; thus, the heavier wools, suitable for winter only, are 12-14 oz.; the medium, "three season" (i.e., excluding summer) are 10-11 oz.; and summer wools are 7-8 oz. (In the days before central heating, heavier wools such as 16 oz. were used in suits; now they are used mainly in overcoats and topcoats.) Other materials are used sometimes, either alone or blended with wool, such as cashmere.!!',
        price: 210,
        categoryId: '3'
    }),
    
    new Product({
       imagePath: 'http://suitored.com/wp-content/uploads/2011/02/Joseph-Abboud-Super-120s-Wool-Tuxedo.jpg',
       title: 'Tuxedo',
       description: 'Tuxedo in the context of menswear originated in the US around 1888.[5] It was named after Tuxedo Park, a Hudson Valley enclave for New York’s social elite where it was often seen in its early years. The term was capitalized until the 1930s and at first referred only to the jacket.[6] When the jacket was later paired with its own unique trousers and accessories in the 1900s the term began to be associated with the entire suit',
       price: 800,
        categoryId: '5'
    }),
];

var done = 0;
for(var i=0;i<products.length;i++){
    products[i].save(function(err,result){
        done++;
        if(done === products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}
