import { CamlResources } from "./CamlResources";
import { Str } from "./StringExtensions";
import { StringBuilder } from "./StringBuilder";


    export enum SortType {
        /// <summary>
        /// Items are sorted in ascending order.
        /// </summary>
        Ascending,
        /// <summary>
        /// Items are sorted in descending order.
        /// </summary>
        Descending
    }


    /// <summary>
    /// Use this enumeration to specify membership types.
    /// </summary>
    export enum MembershipType {
        /// <summary>
        /// Returns all users who are either members of the site or who have browsed to the site as authenticated members of a domain group in the site.
        /// </summary>
        SPWebAllUsers,
        /// <summary>
        /// Returns groups in the site collection.
        /// </summary>
        SPGroup,
        /// <summary>
        /// Returns groups in the SharePoint web.
        /// </summary>
        SPWebGroups,
        /// <summary>
        /// Returns
        /// </summary>
        CurrentUserGroups,
        /// <summary>
        /// Returns all users that have been explicitly added to the web.
        /// </summary>
        SPWebUsers
    }

    /// <summary>
    /// Use this enumeration to specify the base list type for cross site queries.
    /// </summary>
    export enum BaseType {
        /// <summary>
        /// A generic list.
        /// </summary>
        GenericList,
        /// <summary>
        /// A document library.
        /// </summary>
        DocumentLibrary,
        /// <summary>
        /// A discussion forum.
        /// </summary>
        DiscussionForum,
        /// <summary>
        /// A survey list.
        /// </summary>
        VoteOrSurvey,
        /// <summary>
        /// An issue tracking list.
        /// </summary>
        IssuesList
    }

    /// <summary>
    /// Use this enumeration to specify the scope of a site data query.
    /// </summary>
    export enum QueryScope {
        /// <summary>
        /// The query considers only the current SPWeb object.
        /// </summary>
        WebOnly,
        /// <summary>
        /// The query considers all Web sites that are descended from the current SPWeb object.
        /// </summary>
        Recursive,
        /// <summary>
        /// The query considers all Web sites that are in the same site collection as the current Web site.
        /// </summary>
        SiteCollection
    }

    /// <summary>
    /// Specifies how to handle automatic hyperlinks.
    /// </summary>
    export enum AutoHyperlinkType {
        /// <summary>
        /// Hyperlinks are ignored.
        /// </summary>
        None,
        /// <summary>
        /// Surround text with &lt;A&gt; tags if the text appears like a hyperlink (for example, www.johnholliday.net),
        /// but without HTML encoding.
        /// </summary>
        Plain,
        /// <summary>
        /// Surround text with &lt;A&gt; tags if the text appears like a hyperlink, with HTML encoding.
        /// </summary>
        HTMLEncoded
    }

    /// <summary>
    /// Specifies options for URL encoding.
    /// </summary>
    export enum UrlEncodingType {
        /// <summary>
        /// Special characters are not encoded.
        /// </summary>
        None,
        /// <summary>
        /// Convert special characters, such as spaces, to quoted UTF-8 format.
        /// </summary>
        Standard,
        /// <summary>
        /// Convert special characters to quoted UTF-8 format, but treats the characters as a
        /// path component of a URL so that forward slashes ("/") are not encoded.
        /// </summary>
        EncodeAsUrl
    }

    /// <summary>
    /// A helper class for working with CAML queries.
    /// </summary>
    export class CAML {
        /// <summary>
        /// Builds an XML string with or without attributes and attribute values.
        /// </summary>
        /// <param name="tag">the XML element tag</param>
        /// <param name="attribute">the attribute name (can be null)</param>
        /// <param name="attributeValue">the attribute value (can be null)</param>
        /// <param name="value">the element value (can be null)</param>
        /// <returns>an XML string resulting from the combined parameters</returns>
        static Tag(tag: string, attribute: string, attributeValue: string, value: string) : string
        {

            if (Str.isNullOrEmpty(attribute) || Str.isNullOrEmpty(attributeValue)) {
                return Str.isNullOrEmpty(value) ?
                    Str.format("<{0} />", [tag]) :
                    Str.format("<{0}>{1}</{0}>", [tag, value]);
            }
            else {
                    return Str.isNullOrEmpty(value) ?
                        Str.format("<{0} {1}=\"{2}\" />", [tag, attribute, attributeValue]) :
                        Str.format("<{0} {1}=\"{2}\">{3}</{0}>", [tag, attribute, attributeValue, value]);
            }
        }

        /// <summary>
        /// Handles an arbitrary number of attribute value pairs
        /// </summary>
        /// <param name="tag">the XML element tag</param>
        /// <param name="value">the element value</param>
        /// <param name="attributeValuePairs">an array of attribute value pairs</param>
        /// <returns>an XML string resulting from the combined parameters</returns>
    static TagPairs(tag: string, value: string, attributeValuePairs: any[]): string
    {
        var builder = new StringBuilder("<" + tag);
        for (var i = 0; i < attributeValuePairs.length - 1; i += 2)
        {
            builder.AppendFormat(" {0}=\"{1}\"", [attributeValuePairs[i].toString(), attributeValuePairs[i + 1].toString()]);
        }
        if (Str.isNullOrEmpty(value)) {
            builder.Append(" />");
        }
        else {
            builder.AppendFormat(">{0}</{1}>", [value, tag]);
        }
        return builder.ToString();
    }

    /// <summary>
    /// Creates a "safe" identifier for use in CAML expressions.
    /// </summary>
    /// <param name="identifier">the identifier to be tokenized</param>
    /// <returns>a tokenized version of the identifier</returns>
    /// <remarks>This method replaces blank spaces with the "_x0020_" token.</remarks>
    public static SafeIdentifier(identifier: string): string { return identifier.replace(" ", "_x0020_").replace(" ", "_x0020_").replace(" ", "_x0020_").replace(" ", "_x0020_"); }

        /// <summary>
        /// Specifies the logical conjunction of two CAML clauses.
        /// </summary>
        /// <param name="leftPart">the left part of the join</param>
        /// <param name="rightPart">the right part of the join</param>
        /// <returns>a new CAML And element</returns>
    public static And(leftPart: string, rightPart: string): string { return CAML.Tag(CamlResources.And,"","", leftPart + rightPart); }
        /// <summary>
        /// Specifies that the value of a given field begins with the specified value.
        /// </summary>
        /// <param name="fieldRefElement">a CAML FieldRef element</param>
        /// <param name="valueElement">a CAML Value element</param>
        /// <returns>a new CAML BeginsWith element</returns>
    public static BeginsWith(fieldRefElement: string, valueElement: string): string { return CAML.Tag(CamlResources.BeginsWith,"","", fieldRefElement + valueElement); }
        /// <summary>
        /// Specifies that the value of a given field contains the specified value.
        /// </summary>
        /// <param name="fieldRefElement">a CAML FieldRef element</param>
        /// <param name="valueElement">a CAML Value element</param>
        /// <returns>a new CAML Contains element</returns>
    public static Contains(fieldRefElement: string, valueElement: string): string { return CAML.Tag(CamlResources.Contains,"","", fieldRefElement + valueElement); }
        /// <summary>
        /// Tests whether the dates in a recurring event overlap a specified DateTime value.
        /// </summary>
        /// <param name="fieldRefElement">a CAML FieldRef element for the target event date</param>
        /// <param name="valueElement">a CAML Value element containing the date to be tested</param>
        /// <returns>a new CAML DateRangesOverlap element</returns>
    public static DateRangesOverlap(fieldRefElement: string, valueElement: string): string { return CAML.Tag(CamlResources.DateRangesOverlap,"","", fieldRefElement + CAML.FieldRef("EndDate") + CAML.FieldRef("RecurrenceID") + valueElement); }
        /// <summary>
        /// Tests the equality of two CAML clauses.
        /// </summary>
        /// <param name="leftPart">the left part of the expression</param>
        /// <param name="rightPart">the right part of expression</param>
        /// <returns>a new CAML EQ element</returns>
        public static Eq(leftPart: string, rightPart: string): string { return CAML.Tag(CamlResources.Eq,"","", leftPart + rightPart); }

        
        public static FieldRef(fieldName: string): string {
            return CAML.Tag(CamlResources.FieldRef, CamlResources.Name, CAML.SafeIdentifier(fieldName), "");
        }



        /// <summary>
        /// Identifies a CAML field by reference.
        /// </summary>
        /// <param name="fieldName">the name of the referenced field</param>
        /// <param name="isLookup">if set to <c>true</c> [is lookup].</param>
        /// <returns>a new CAML FieldRef element</returns>
        public static FieldRefLookup(fieldName: string, isLookup: boolean): string {
            if (isLookup) {
                return CAML.TagPairs(CamlResources.FieldRef, "", ["Name", CAML.SafeIdentifier(fieldName), "LookupId", "TRUE" ]);
            }
            return CAML.Tag(CamlResources.FieldRef, CamlResources.Name, CAML.SafeIdentifier(fieldName), "");
        }

        /// <summary>
        /// Fields the reference.
        /// </summary>
        /// <param name="fieldName">Name of the field.</param>
        /// <param name="order">The order.</param>
        /// <returns>System.String.</returns>
        public static FieldRefAsSorted(fieldName: string, order: SortType): string
        {
            return CAML.TagPairs(CamlResources.FieldRef, "", ["Name", CAML.SafeIdentifier(fieldName), "Ascending", (order == SortType.Descending ? "FALSE" : "TRUE")]);
        }

        /// <summary>
        /// Identifies a CAML field and specifies a sorting.
        /// </summary>
        /// <param name="fieldName">the name of the referenced field</param>
        /// <param name="sortType">indicates how the resulting field instances shall be sorted</param>
        /// <param name="isLookup">if set to <c>true</c> [is lookup].</param>
        /// <returns>a new CAML FieldRef element with sorting</returns>
        public static FieldRefAsSortedLookup(fieldName: string, sortType: SortType, isLookup: boolean): string
        {
            if (isLookup) {
                return CAML.TagPairs(CamlResources.FieldRef,"", ["LookupId", "TRUE", "Ascending", sortType == SortType.Ascending ? "TRUE" : "FALSE", CamlResources.Name, CAML.SafeIdentifier(fieldName) ]);
            }

            return CAML.TagPairs(CamlResources.FieldRef,"", [ "Ascending", sortType == SortType.Ascending ? "TRUE" : "FALSE", CamlResources.Name, CAML.SafeIdentifier(fieldName) ]);
        }

        /// <summary>
        /// Tests whether the left expression is greater than or equal to the right.
        /// </summary>
        /// <param name="leftPart">the left expression</param>
        /// <param name="rightPart">the right expression</param>
        /// <returns>a new CAML GEQ element</returns>
        public static Geq(leftPart: string, rightPart: string): string { return CAML.Tag(CamlResources.Geq,"","", leftPart + rightPart); }
        /// <summary>
        /// Identifies a field reference for grouping and specifies whether to collapse the group.
        /// </summary>
        /// <param name="fieldRefElement">a CAML FieldRef element</param>
        /// <param name="bCollapse">whether to collapse the group</param>
        /// <returns>a new CAML GroupBy element</returns>
        public static GroupBy(fieldRefElement: string, bCollapse: boolean) { return CAML.Tag(CamlResources.GroupBy, CamlResources.Collapse, bCollapse ? "TRUE" : "FALSE", fieldRefElement); }
        /// <summary>
        /// Tests whether the left expression is greater than the right.
        /// </summary>
        /// <param name="leftPart">the left expression</param>
        /// <param name="rightPart">the right expression</param>
        /// <returns>a new CAML GT element</returns>
        public static Gt(leftPart: string, rightPart: string) { return CAML.Tag(CamlResources.Gt,"","", leftPart + rightPart); }
        /// <summary>
        /// Determines whether a given field contains a value.
        /// </summary>
        /// <param name="fieldRefElement">a CAML FieldRef element</param>
        /// <returns>a new CAML IsNotNull element</returns>
        public static IsNotNull(fieldRefElement: string): string { return CAML.Tag(CamlResources.IsNotNull,"","", fieldRefElement); }
        /// <summary>
        /// Determines whether a given field is null.
        /// </summary>
        /// <param name="fieldRefElement">a CAML FieldRef element</param>
        /// <returns>a new CAML IsNull element</returns>
        /// <remarks>Converse of IsNotNull</remarks>
        public static IsNull(fieldRefElement: string): string { return CAML.Tag(CamlResources.IsNull,"","", fieldRefElement); }
        /// <summary>
        /// Tests whether the left expression is less than or equal to the right.
        /// </summary>
        /// <param name="leftPart">the left expression</param>
        /// <param name="rightPart">the right expression</param>
        /// <returns>a new CAML LEQ element</returns>
        public static Leq(leftPart: string, rightPart: string): string { return CAML.Tag(CamlResources.Leq,"","", leftPart + rightPart); }
        /// <summary>
        /// Allows a query to include specific lists, instead of returning all lists of a particular type.
        /// </summary>
        /// <param name="listId">identifies the lists</param>
        /// <returns>System.String.</returns>
        public static List(listId: string): string
        {
            return CAML.Tag(CamlResources.List, "ID", listId.replace("{", "").replace("}", ""), "");
        }
        /// <summary>
        /// Specifies which lists to include in a query.
        /// </summary>
        /// <param name="listElements">an XML string containing individual list elements</param>
        /// <returns>System.String.</returns>
        public static ListsSimple(listElements: string): string { return CAML.Lists__(BaseType.GenericList, listElements,"", false, 0); }
        
        /// <summary>
        /// Specifies which lists to include in a query.
        /// </summary>
        /// <param name="listElements">an XML string containing individual list elements</param>
        /// <param name="includeHiddenLists">determines whether the query will include hidden lists</param>
        /// <returns>System.String.</returns>
        public static Lists(listElements: string, includeHiddenLists: boolean): string { return CAML.Lists__(BaseType.GenericList, listElements,"", includeHiddenLists, 0); }
        /// <summary>
        /// Specifies which lists to include in a query.
        /// </summary>
        /// <param name="listElements">an XML string containing individual list elements</param>
        /// <param name="maxListLimit">limits the query to the total number of lists specified.  By default, the limit is 1000.</param>
        /// <returns>System.String.</returns>
        public static ListsLimited(listElements: string, maxListLimit: number) { return CAML.Lists__(BaseType.GenericList, listElements,"", false, maxListLimit); }
        /// <summary>
        /// Specifies which lists to include in a query.
        /// </summary>
        /// <param name="listElements">an XML string containing individual list elements</param>
        /// <param name="serverTemplate">limits the query to lists of the specified server template, specified as a number - for example '101'</param>
        /// <param name="includeHiddenLists">determines whether the query will include hidden lists</param>
        /// <returns>System.String.</returns>
        public static ListsTemplate(listElements: string, serverTemplate: string, includeHiddenLists: boolean): string { return CAML.Lists__(BaseType.GenericList, listElements, serverTemplate, includeHiddenLists, 0); }
        /// <summary>
        /// Specifies which lists to include in a query.
        /// </summary>
        /// <param name="baseType">limits the query to lists of the specified base type</param>
        /// <param name="listElements">an XML string containing individual list elements</param>
        /// <returns>System.String.</returns>
        public static ListsWithBaseType(baseType: BaseType, listElements: string): string { return CAML.Lists__(baseType, listElements,"", false, 0); }

        /// <summary>
        /// Specifies which lists to include in a query.
        /// </summary>
        /// <param name="baseType">limits the query to lists of the specified base type</param>
        /// <param name="listElements">an XML string containing individual list elements</param>
        /// <param name="serverTemplate">limits the query to lists of the specified server template, specified as a number - for example '101'</param>
        /// <param name="includeHiddenLists">determines whether the query will include hidden lists</param>
        /// <param name="maxListLimit">limits the query to the total number of lists specified.  By default, the limit is 1000.</param>
        /// <returns>System.String.</returns>
        public static Lists__(baseType: BaseType, listElements: string, serverTemplate: string, includeHiddenLists: boolean, maxListLimit: number): string
        {
            var sb = new StringBuilder("");
            sb.AppendFormat("<Lists BaseType=\"{0}\"", [baseType.toString()]);
            if (!Str.isNullOrEmpty(serverTemplate)) {
                sb.AppendFormat(" ServerTemplate=\"{0}\"", [serverTemplate]);
            }
            sb.AppendFormat(" Hidden=\"{0}\"", [includeHiddenLists ? "TRUE" : "FALSE"]);
            if (maxListLimit > 0) sb.AppendFormat(" MaxListLimit=\"{0}\"", [maxListLimit.toString()]);
            sb.AppendFormat(">{0}</Lists>", [listElements]);
            return sb.ToString();
        }
        /// <summary>
        /// Special optional child of the Lists element.
        /// </summary>
        /// <param name="fieldID">the guid of the indexed field</param>
        /// <param name="fieldValue">the matching field value</param>
        /// <returns>System.String.</returns>
        /// <remarks>When present, this element causes the query to be limited to lists
        /// with indexed fields.</remarks>
        public static WithIndex(fieldID: string, fieldValue: string): string
    {
        return CAML.TagPairs(CamlResources.WithIndex,"", ["FieldId", fieldID.replace("{", "").replace("}", ""),
            "Type", "Text", "Value", fieldValue
        ]);
    }

        /// <summary>
        /// Tests whether the left expression is less than the right.
        /// </summary>
        /// <param name="leftPart">the left expression</param>
        /// <param name="rightPart">the right expression</param>
        /// <returns>a new CAML LT element</returns>
        public static Lt(leftPart: string, rightPart: string): string { return CAML.Tag(CamlResources.Lt,"","", leftPart + rightPart); }
        /// <summary>
        /// Specifies the membership for a query <see cref="CAML.MembershipType" />
        /// </summary>
        /// <param name="type">specifies the membership type</param>
        /// <param name="value">specifies the membership filter value</param>
        /// <returns>a new CAML Membership element</returns>
        public static Membership(type: MembershipType, value: string): string
        {
            switch (type) {
                case MembershipType.SPWebAllUsers:
                    return CAML.Tag(CamlResources.Membership, CamlResources.Type, CamlResources.SPWebAllUsers, value);
                case MembershipType.SPWebGroups:
                    return CAML.Tag(CamlResources.Membership, CamlResources.Type, CamlResources.SPWebGroups, value);
                case MembershipType.SPWebUsers:
                    return CAML.Tag(CamlResources.Membership, CamlResources.Type, CamlResources.SPWebUsers, value);
                case MembershipType.CurrentUserGroups:
                    return CAML.Tag(CamlResources.Membership, CamlResources.Type, CamlResources.CurrentUserGroups, value);
                case MembershipType.SPGroup:
                    return CAML.Tag(CamlResources.Membership, CamlResources.Type, CamlResources.SPGroup, value);
            }
            return CAML.Tag(CamlResources.Membership, CamlResources.Type, CamlResources.CurrentUserGroups, value);
        }

        /// <summary>
        /// Tests whether the left expression is unequal to the right.
        /// </summary>
        /// <param name="leftPart">the left expression</param>
        /// <param name="rightPart">the right expression</param>
        /// <returns>a new CAML NEQ element</returns>
        public static Neq(leftPart: string, rightPart: string): string { return CAML.Tag(CamlResources.Neq,"","", leftPart + rightPart); }
        /// <summary>
        /// Specifies the logical disjunction of two CAML expressions.
        /// </summary>
        /// <param name="leftPart">the left part of the logical join</param>
        /// <param name="rightPart">the right part of the logical join</param>
        /// <returns>a new CAML OR element</returns>
        public static Or(leftPart: string, rightPart: string): string { return CAML.Tag(CamlResources.Or,"","", leftPart + rightPart); }

        
        public static OrderBy(args: string[]): string
        {
            var fieldRefElements = "";
            for (var i = 0; i < args.length; i++) {
                fieldRefElements += args[i];
            }
            return CAML.Tag(CamlResources.OrderBy,"","", fieldRefElements);
        }

        /// <summary>
        /// Lookups the value.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>System.String.</returns>
        public static LookupValue(id: number): string
        {
            return CAML.Tag(CamlResources.Value, CamlResources.Type, CamlResources.Lookup, id.toString());
        }

        /// <summary>
        /// Specifies a string value
        /// </summary>
        /// <param name="fieldValue">the string value to be expressed in CAML</param>
        /// <returns>a new CAML Value element</returns>
        public static Value(fieldValue: string): string { return CAML.Tag(CamlResources.Value, CamlResources.Type, CamlResources.Text, fieldValue); }
        /// <summary>
        /// Specifies an integer value
        /// </summary>
        /// <param name="fieldValue">the integer value to be expressed in CAML</param>
        /// <returns>a new CAML Value element</returns>
        public static ValueAsInt(fieldValue: number): string { return CAML.Tag(CamlResources.Value, CamlResources.Type, CamlResources.Integer, fieldValue.toString()); }
        /// <summary>
        /// Specifies a DateTime value
        /// </summary>
        /// <param name="fieldValue">the DateTime value to be expressed in CAML</param>
        /// <returns>a new CAML Value element</returns>
        public static ValueAsDate(fieldValue: Date): string { return CAML.Tag(CamlResources.Value, CamlResources.Type, CamlResources.DateTime, fieldValue.toISOString()); }

        /// <summary>
        /// Specifies a DateTime value
        /// </summary>
        /// <param name="fieldValue">the DateTime value to be expressed in CAML</param>
        /// <returns>a new CAML Value element</returns>
        public static ValueAsDateString(fieldValue: string): string { return CAML.Tag(CamlResources.Value, CamlResources.Type, CamlResources.DateTime, fieldValue); }

        /// <summary>
        /// Todays the specified offset.
        /// </summary>
        /// <param name="offset">The offset.</param>
        /// <returns>System.String.</returns>
        public static Today(offset:number): string
        {
            if (offset == -1) {
                return CAML.Tag(CamlResources.Value, CamlResources.Type, CamlResources.DateTime, "<" + CamlResources.Today + "/>");
            }
            else {
                return CAML.Tag(CamlResources.Value, CamlResources.Type, CamlResources.DateTime, "<" + CamlResources.Today + " OffsetDays=\"" + offset + "\" />");
            }
        }

        // <summary>
        /// Specifies a boolean value
        /// </summary>
        /// <param name="fieldValue">the boolean value to be expressed in CAML</param>
        /// <returns>a new CAML Value element</returns>
        public static RowLimit(fieldValue: number): string { return CAML.Tag(CamlResources.RowLimit,'', '', fieldValue.toString()); }

        /// <summary>
        /// Specifies a boolean value
        /// </summary>
        /// <param name="fieldValue">the boolean value to be expressed in CAML</param>
        /// <returns>a new CAML Value element</returns>
        public static ValueAsBoolean(fieldValue: boolean): string { return CAML.Tag(CamlResources.Value, CamlResources.Type, CamlResources.Boolean, fieldValue ? "1" : "0"); }
        /// <summary>
        /// Specifies a value of a given type
        /// </summary>
        /// <param name="valueType">a string describing the data type</param>
        /// <param name="fieldValue">the value formatted as a string</param>
        /// <returns>a new CAML Value element</returns>
        public static ValueTyped(valueType: string, fieldValue: string): string { return CAML.Tag(CamlResources.Value, CamlResources.Type, valueType, fieldValue); }
        /// <summary>
        /// Specifies which fields to include in the query result set.
        /// </summary>
        /// <param name="fields">an array of CAML FieldRef elements that identify the fields to be included</param>
        /// <returns>a new CAML ViewFields element</returns>
        public static ViewFields(viewFields: string[]): string
        {
            var fieldRefElements = "";
            for (var i = 0; i < viewFields.length; i++) {
                fieldRefElements += viewFields[i];
            }
            return CAML.Tag(CamlResources.ViewFields,"","", fieldRefElements);
        }

        /// <summary>
        /// Specify de Query camlquery .
        /// </summary>
        /// <param name="args">an array of CAML FieldRef elements that identify the fields to be included</param>
        /// <returns>a new CAML Query element</returns>
        public static Query(args: string[]): string
        {
            var fieldRefElements = "";
            for (var i = 0; i < args.length; i++) {
                fieldRefElements += args[i];
            }
            return CAML.Tag(CamlResources.Query,"","", fieldRefElements);
        }

        /// <summary>
        /// Specify de view camlquery .
        /// </summary>
        /// <param name="view">an array of CAML FieldRef elements that identify the fields to be included</param>
        /// <returns>a new CAML ViewFields element</returns>
        public static View(args: string[]): string
        {
            var internElements = "";
            for (var i = 0; i < args.length; i++) {
                internElements += args[i];
            }
            return CAML.Tag(CamlResources.View,"","", internElements);
        }

        /// <summary>
        /// Specifies which Web sites to include in the query as specified by the Scope attribute.
        /// </summary>
        /// <param name="scope">specifies the query scope</param>
        /// <returns>System.String.</returns>
        public static Webs(scope: QueryScope): string
        {
            return CAML.Tag(CamlResources.Webs,"", CamlResources.Scope, scope.toString());
        }
        
        /// <summary>
        /// Specifies a global site property and a default value.
        /// </summary>
        /// <param name="propertyName">the name of the property to be retrieved</param>
        /// <param name="defaultValue">the default value to use if the property is not found</param>
        /// <returns>a new CAML ProjectProperty element</returns>
        public static SimpleProjectProperty(propertyName: string, defaultValue: string):  string
        {
            return CAML.TagPairs(CamlResources.ProjectProperty,"",
                [
                    CamlResources.Select, propertyName,
                    CamlResources.Default, defaultValue
                ]);
        }

    

        /// <summary>
        /// Specifies a global site property and other options.
        /// </summary>
        /// <param name="propertyName">the name of the property to be retrieved</param>
        /// <param name="defaultValue">the default value to use if the property is not found</param>
        /// <param name="autoHyperlinkType">specifies how to handle hyperlinks <see cref="CAML.AutoHyperlinkType" /></param>
        /// <param name="autoNewLine">TRUE to insert &lt;BR&gt; tags into the text stream and to replace multiple spaces with a nonbreaking space.</param>
        /// <param name="expandXML">TRUE to re-pass the rendered content through the CAML interpreter, which allows CAML to render CAML.</param>
        /// <param name="htmlEncode">TRUE to convert embedded characters so that they are displayed as text in the browser.  In other words, characters that could be confused with HTML tags are converted to entities.</param>
        /// <param name="stripWhiteSpace">TRUE to remove white space from the beginning and end of the value returned by the element.</param>
        /// <param name="urlEncodingType">specifies how to handle URL encoding <see cref="CAML.UrlEncodingType" /></param>
        /// <returns>System.String.</returns>
        public static ProjectProperty(propertyName: string, defaultValue: string,
            autoHyperlinkType: AutoHyperlinkType, autoNewLine:boolean, expandXML: boolean, htmlEncode: boolean,
            stripWhiteSpace:  boolean, urlEncodingType: UrlEncodingType): string
        {
            return CAML.TagPairs(CamlResources.ProjectProperty,"",
            [
                CamlResources.Select, propertyName,
                CamlResources.Default, defaultValue,
                autoHyperlinkType==AutoHyperlinkType.Plain ? CamlResources.AutoHyperLinkNoEncoding : CamlResources.AutoHyperLink,
                autoHyperlinkType==AutoHyperlinkType.None ? "FALSE" : "TRUE",
                CamlResources.AutoNewLine, autoNewLine? "TRUE" : "FALSE",
                CamlResources.HTMLEncode, htmlEncode? "TRUE" : "FALSE",
                CamlResources.StripWS, stripWhiteSpace? "TRUE" : "FALSE",
                urlEncodingType==UrlEncodingType.EncodeAsUrl ? CamlResources.URLEncodeAsURL : CamlResources.URLEncode,
                urlEncodingType==UrlEncodingType.None ? "FALSE" : "TRUE"
            ]);
        }

        /// <summary>
        /// Specifies the WHERE part of a query.
        /// </summary>
        /// <param name="s">a CAML string that expresses the WHERE conditions</param>
        /// <returns>a new CAML Where element</returns>
        public static Where(s: string): string { return CAML.Tag(CamlResources.Where,"","", s); }

        /// <summary>
        /// Specifies a custom XML element.
        /// </summary>
        /// <param name="s">a CAML string to be embedded in the element</param>
        /// <returns>a new CAML XML element</returns>
        public static XML(s: string): string { return CAML.Tag(CamlResources.XML,"","", s); }
    }